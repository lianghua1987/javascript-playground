#!/usr/bin/env node
import Runner from './runner.js';

const runner = new Runner();

const run = async () => {
  await runner.collectFiles(process.cwd())
  console.log(runner.testFiles);
  await runner.runTests();
};

run()
  .then(r => console.log("Test finished"))
  .catch(e => console.error(e));
