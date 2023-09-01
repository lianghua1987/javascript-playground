import render from "../../render.js";
import assert from 'assert';

let dom, inputElement;
beforeEach(async () => {
  dom = await render('./index.html');
  inputElement = dom.window.document.querySelector('input');
});

it('has a text input', async () => {
  assert(inputElement);
});

it('Shows a success message with a valid email', async () => {
  inputElement.value = 'hua.liang@test.com';
  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));
  const h1 = dom.window.document.querySelector('h1');
  assert.strictEqual(h1.innerHTML, 'Looks good!');
});

it('Shows a failed message with a invalid email', async () => {
  inputElement.value = 'hua.liang-test.com';
  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));
  const h1 = dom.window.document.querySelector('h1');
  assert.strictEqual(h1.innerHTML, 'Invalid email!');
});

it('Force fail', async () => {
  inputElement.value = 'hua.liang-test.com';
  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));
  const h1 = dom.window.document.querySelector('h1');
  assert.strictEqual(h1.innerHTML, 'Gibberish');
});