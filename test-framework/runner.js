import fs from 'fs';
import path from 'path';
import chalk from "chalk";
import render from "./render.js";

const ignoredDirs = ['node_modules'];

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
      global.it = async (desc, fn) => {
        for (let func of beforeEaches) {
          await func();
        }
        try {
          await fn();
          console.log(`\t${chalk.bgGreen('Passed')} - ${desc}`);
        } catch (err) {
          console.log(`\t${chalk.bgRed('Failed')} - ${desc}\n\t\t${chalk.red(err.message.replace(/\n/g, '\n\t\t'))}`);
        }
      };
      global.render = render;
      try {
        import(`file://${file.filePath}`);
      } catch (err) {
        console.error(`\t${chalk.bgRed('Error')} Error loading files. \n\t${chalk.red(err.message.replace(/\n/g, '\n\t\t'))}`);
      }
    }
  }

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);
    console.log(chalk.cyan`Start scanning dir ${targetPath}`);
    for (let fileName of files) {
      const filePath = path.join(targetPath, fileName);
      const stats = await fs.promises.lstat(filePath);
      console.log(`Scanned: ${filePath}`);
      if (stats.isFile() && fileName.includes(".test.js")) {
        this.testFiles.push({filePath, fileName});
      } else if (stats.isDirectory() && !ignoredDirs.includes(fileName)) {
        const childFiles = await fs.promises.readdir(filePath);
        files.push(...childFiles.map(f => path.join(fileName, f)));
      }
    }
    return files;
  }
}

export default Runner;