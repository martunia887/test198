const fs = require('fs-extra');
const path = require('path');

const folderPath = path.resolve(__dirname, 'pages/generated');

const getName = pi => path.basename(pi, path.extname(pi));
const lineTemplate = p => `export { default } from '${p}'`;
const writeIndex = p => {
  const names = p.map(
    ({ name, sitePath }) =>
      `<li><Link><a href="${sitePath}">${name}</a></Link></li>`,
  );

  const template = `
    import Link from 'next/link'

    export default () => (
        <div>
            ${names.join('\n')}
        </div>
    )
    `;
  fs.writeFileSync(path.resolve(folderPath, 'index.tsx'), template);
};

const getData = absPath => ({
  absPath,
  name: getName(absPath),
  sitePath: `/generated/${getName(absPath)}`,
});

const cleanup = () => {
  if (fs.existsSync(folderPath)) {
    fs.emptyDirSync(folderPath);
    fs.rmdirSync(folderPath);
  }
  fs.mkdirSync(folderPath);
};

const writeExampleFile = ({ absPath }) => {
  const fileContent = lineTemplate(absPath);
  const filePath = path.resolve(folderPath, `${getName(absPath)}.tsx`);
  fs.writeFileSync(filePath, fileContent);
};

const actions = basePath => {
  cleanup();
  const data = fs
    .readdirSync(basePath)
    .map(p => path.resolve(basePath, p))
    .filter(p => fs.statSync(p).isFile())
    .map(getData);

  data.forEach(writeExampleFile);
  writeIndex(data);
  return data;
};

module.exports = actions;
