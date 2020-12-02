var fs = require('fs');
var path = require('path');

const npm_package_version = process.env.npm_package_version;
const CONSTANTS_PATH = path.resolve('./src/lib/config/constants.ts');
const CHANGE_LOG_PATH = path.resolve('./CHANGELOG.MD');
const CHANGE_LOG_TARGET_PATH = path.resolve('./dist/CHANGELOG.MD');

console.log('Current version: ' + npm_package_version);

fs.readFile(CONSTANTS_PATH, (error, file) => {
  if (error) {
    console.log(`Write version error, check file ${CONSTANTS_PATH} is exists.`);
  }
  const result = file.toString().replace(/VERSION: 'v.*?',/gi, `VERSION: 'v${npm_package_version}',`);
  fs.writeFile(CONSTANTS_PATH, result, () => {});
  console.log('Write version finish.');
});

fs.readFile(CHANGE_LOG_PATH, (error, file) => {
  if (error) {
    console.log(`Copy logs file error, check file ${CHANGE_LOG_PATH} is exists.`);
  }
  fs.writeFile(CHANGE_LOG_TARGET_PATH, file, () => {});
  console.log('Copy logs finish.');
});
