const fs = require('fs');
const path = require('path');

const lessFilePaths = [];
getLessFilePaths(path.resolve('./src'));

console.log(lessFilePaths);
function getLessFilePaths(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      files.forEach(function (filename) {
        const filedir = path.join(filePath, filename);
        fs.stat(filedir, function (error, stats) {
          if (error) {
            console.warn('获取文件 stats 失败');
            console.warn(error);
          } else {
            const isFile = stats.isFile();
            const isDir = stats.isDirectory();
            if (isDir) {
              getLessFilePaths(filedir);
            }
            if (isFile && path.extname(filedir) === '.less') {
              if (path.basename(filedir) !== 'extracted-less') {
                lessFilePaths.push(filedir);
              }
            }
          }
        });
      });
    }
  });
}
