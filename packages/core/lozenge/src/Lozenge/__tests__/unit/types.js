// @flow

// TODO
// ignore colocated .snap from git
// capture -u and run this stuff beforehand
// unwrap snap for root index.d.ts

import fs from 'fs';
import util from 'util';
import path from 'path';
import { toMatchSnapshot } from 'jest-snapshot';

const fsCopy = util.promisify(fs.copyFile);
const fsRead = util.promisify(fs.readFile);
const fsWrite = util.promisify(fs.writeFile);

const testHeading = 'Lozenge - Type Definitions';
const testTitle = 'should match auto-generated types from generate-react-types';

const packageRoot = __dirname.split('/src')[0];
const definitionPath = path.join(packageRoot, 'index.d.ts');
const snapshotPath = path.join(__dirname, '__snapshots__', 'types.js.snap');

const generateReactTypes = () => `declare module '@atlaskit/lozenge' {\n\n}`;
const options = { flag: 'w' };

const snapshotOutput = types => `// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[\`${testHeading} ${testTitle} 1\`] = \`
"${types}
"
\`;
`;

expect.extend({
  async toMatchTypeDefinitions(received) {
    if (fs.existsSync(definitionPath)) {
      try {
        const data = await fsRead(definitionPath, 'utf8');
        await fsWrite(snapshotPath, snapshotOutput(data), options);
        const { message, pass } = toMatchSnapshot.call(this, received);
        return { message, pass };
      } catch (e) {
        return {
          message: () => `Nope #1, ${e}`,
          pass: false,
        };
      }
    }

    const { message, pass } = toMatchSnapshot.call(this, received);
    try {
      await fsCopy(snapshotPath, definitionPath);
      return { message, pass };
    } catch (e) {
      return {
        message: () => `Nope #2, ${e}`,
        pass: false,
      };
    }
  },
});

describe(testHeading, () => {
  it(testTitle, async () => {
    const result = generateReactTypes();
    await expect(result).toMatchTypeDefinitions();
  });
});
