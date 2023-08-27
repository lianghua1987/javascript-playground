const assert = require('assert')

const {forEach, map} = require('./index');
const {color} = require("../util");


const test = (desc, fn) => {
  console.log(`Start testing '${desc}'`);
  try {
    fn();
    console.log(color.BgGreen + color.END, 'Passed')
  } catch (err) {
    console.log(color.BgRed + color.END, 'Failed', err);
  }
};

test('forEach', () => {
  let sum = 0;
  forEach([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], v => sum += v);
  assert.strictEqual(sum, 55, "Expected summing array to equal 55");
});

test('map', () => {
  const result = map([1, 2, 3], v => v * 2);
  assert.strictEqual(2, result[0], `Expected result is 2, but found ${result[0]}`);
  assert.strictEqual(4, result[1], `Expected result is 2, but found ${result[1]}`);
  assert.strictEqual(6, result[2], `Expected result is 2, but found ${result[2]}`);
  assert.deepStrictEqual(result, [2, 4, 6]);
});




