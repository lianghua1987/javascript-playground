import assert from 'assert';
import {forEach} from "../index.js";

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
  assert.strictEqual(4, numbers.length);
});


123
