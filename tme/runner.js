const fs = require('fs');
const path = require('path');

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (let file of this.testFiles) {
      const beforeEaches = [];
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };
      global.it = (desc, fn) => {
        beforeEaches.forEach(func => func());
        fn();
      }
      require(file.filePath);
    }
  }

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (let file of files) {
      const filePath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filePath);
      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({filePath});
      } else if (stats.isDirectory()) {
        const childFiles = await fs.promises.readdir(filePath);
        files.push(...childFiles.map(f => path.join(file, f)));
      }
    }
    return files;
  }


}

module.exports = Runner;