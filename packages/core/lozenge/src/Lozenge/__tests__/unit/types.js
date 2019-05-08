// @flow

// TODO
// ignore colocated .snap from git
// capture -u and run this stuff beforehand
// unwrap snap for root index.d.ts

import fs from 'fs';
import util from 'util';
import path from 'path';
import { toMatchSnapshot } from 'jest-snapshot';

const fsRead = util.promisify(fs.readFile);
const fsWrite = util.promisify(fs.writeFile);
const fsUnlink = util.promisify(fs.unlink);

const testHeading = 'Lozenge - Type Definitions';
const testTitle = 'should match auto-generated types from generate-react-types';

const packageRoot = __dirname.split('/src')[0];
const definitionFilePath = path.join(packageRoot, 'index.d.ts');
const snapshotFilePath = path.join(__dirname, '__snapshots__', 'types.js.snap');

const generateReactTypes = () => `declare module '@atlaskit/lozenge' {\n\n}`;
const OPTIONS = { encoding: 'utf8', flag: 'w' };
const errorMessage = error => ({ message: () => error, pass: false });

const snapshotOutput = types => `// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[\`${testHeading} ${testTitle} 1\`] = \`
"${types}"
\`;
`;

expect.extend({
  toMatchTypeDefinitions(received) {
    return fs.exists(definitionFilePath, async isAvailable => {
      if (isAvailable) {
        try {
          const data = await fsRead(definitionFilePath, 'utf8');
          await fsWrite(snapshotFilePath, snapshotOutput(data), OPTIONS);
          const result = await toMatchSnapshot.call(this, received);
          return result;
        } catch (e) {
          return errorMessage(e);
        }
      }
      return {
        message: () => 'Nope',
        pass: false,
      };
    });
  },
});

// try {
//   const { message, pass } = await toMatchSnapshot.call(this, received);
//   await fsWrite(definitionFilePath, received, OPTIONS);
//   return { message, pass };
// } catch (e) {
//   return errorMessage(e);
// }

// beforeEach(async () => {
//   if (fs.existsSync(definitionFilePath)) {
//     const data = await fsRead(definitionFilePath, 'utf8');
//     await fsWrite(snapshotFilePath, snapshotOutput(data), OPTIONS);
//   }
// });

afterEach(async () => {
  await fsUnlink(snapshotFilePath);
});

describe(testHeading, () => {
  it(testTitle, async () => {
    const result = generateReactTypes();
    await expect(result).toMatchTypeDefinitions();
  });
});
