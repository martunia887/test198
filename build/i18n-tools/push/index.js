/* eslint-disable no-param-reassign */
// @flow
const path = require('path');
const Listr = require('listr');
const globby = require('globby');
const { msg2pot } = require('babel-plugin-react-intl-pot');

const smartling = require('traduki-lite');
const { extractMessagesFromFile, isTypeScript } = require('../utils');
const { pushTranslations } = require('../utils/transifex');

const getExtensions = type => (isTypeScript(type) ? '.ts{,x}' : '.js{,x}');

function pushCommand(options /*: Object*/) {
  const {
    absPathToPackage,
    searchDir,
    dry,
    project,
    resource,
    type,
    ignore,
  } = options;
  const typeName = isTypeScript(type) ? 'TypeScript' : 'JavaScript';
  const dirToSearch = path.join(absPathToPackage, searchDir);
  return new Listr([
    {
      title: `Finding ${typeName} files`,
      task: async (context, task) => {
        const files = await globby(
          [
            `**/*${getExtensions(type)}`,
            ...ignore.split(',').map(s => `!${s}`),
          ],
          {
            cwd: dirToSearch,
          },
        );
        if (files.length === 0) {
          throw new Error(`No ${typeName} files in ${searchDir} directory...`);
        }
        task.title = `Found ${files.length} files in ${searchDir} directory...`;
        context.files = files.map(file => path.join(dirToSearch, file));
      },
    },
    {
      title: 'Extracting translations',
      task: async (context, task) => {
        const extractionPromises = context.files.map(extractMessagesFromFile);
        const allMessagesFromFiles = await Promise.all(extractionPromises);
        const messages = allMessagesFromFiles.reduce(
          (allMessages, nextMessages) => [...allMessages, ...nextMessages],
          [],
        );

        // Search for duplicate messageIds
        const duplicateMessageIds = messages
          .map(m => m.id)
          .filter((id, idx, arr) => arr.indexOf(id) !== idx);

        if (duplicateMessageIds.length !== 0) {
          throw new Error(
            `Duplicate messageIds found: ${duplicateMessageIds.join(',')}`,
          );
        }
        task.title = `Found ${messages.length} messages...`;
        context.messages = messages;
      },
    },
    {
      title: 'Converting JSON to POT',
      task: context => {
        const pot = msg2pot(context.messages);
        if (!pot || pot.length === 0) {
          throw new Error(`JSON to POT conversion failed!`);
        }
        context.pot = pot;
      },
    },
    {
      title: 'Pushing to Transifex',
      skip: () => dry,
      task: async context => {
        context.data = await pushTranslations(project, resource, context.pot);
      },
    },
    {
      title: 'Pushing to Smartling',
      skip: () => dry,
      task: async context => {
        try {
          context.smartlingData = await smartling.pushSource(
            project,
            resource,
            context.messages,
          );
        } catch (e) {
          // For now don't let this kill the build
          // After we are no longer using Transifex, we should remove the catch
          // and let it fail the process
          context.smartlingData = {
            error: e,
          };
        }
      },
    },
  ])
    .run()
    .then(({ pot, data, smartlingData }) => {
      if (dry) {
        console.log(`\n${pot}`);
      } else {
        console.log(
          `\nSuccess:\nAdded: ${data.strings_added}\nUpdated: ${
            data.strings_updated
          }\nDeleted: ${
            data.strings_delete
          }\nSmartling : ${smartlingData.error || smartlingData.stringCount}
          `,
        );
      }
    });
}

module.exports = pushCommand;
