const {forEach} = require('../index');
const assert = require("assert");

let numbers;

beforeEach(() => {
  numbers = [1, 2, 3, 4, 5];
})


it('Should return sum of the array', () => {
  let sum = 0;
  forEach(numbers, (n) => {
    sum += n;
  });

  assert.strictEqual(sum, 15);

});


it('Should have length of 5', () => {
  assert.strictEqual(5, numbers.length);
})