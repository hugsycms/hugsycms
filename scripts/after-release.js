var fs = require('fs');
var path = require('path');

const npm_package_version = process.env.npm_package_version;
const CONSTANTS_PATH = path.resolve('./src/lib/config/constants.ts');
const CHANGE_LOG_PATH = path.resolve('./CHANGELOG.MD');
const CHANGE_LOG_TARGET_PATH = path.resolve('./dist/CHANGELOG.MD');

console.log('当前版本为：' + npm_package_version);

fs.readFile(CONSTANTS_PATH, (error, file) => {
  if (error) {
    console.log('写入版本号发生错误，请检查文件是否存在');
  }
  const result = file.toString().replace(/VERSION: 'v.*?',/gi, `VERSION: 'v${npm_package_version}',`);
  fs.writeFile(CONSTANTS_PATH, result, () => {});
  console.log('变量写入完毕');
});

fs.readFile(CHANGE_LOG_PATH, (error, file) => {
  if (error) {
    console.log('复制日志发生错误，请检查文件是否存在');
  }
  fs.writeFile(CHANGE_LOG_TARGET_PATH, file, () => {});
  console.log('日志复制完毕');
});

