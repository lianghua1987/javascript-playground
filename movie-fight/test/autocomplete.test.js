beforeEach(() => {
  document.querySelector('#target').innerHTML = '';
  createAutoComplete({
    root: document.querySelector('#target'),
    onSearch() {
      return [{Title: 'title1'}, {Title: 'title2'}, {Title: 'title3'}]
    },
    renderOption(item) {
      return item.Title;
    }
  });
});

const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 100);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 2000);
  });
}

it('Dropdown starts closed', () => {
  const dropdown = document.querySelector('.dropdown');
  expect(dropdown.className).not.to.include('is-active');
});

it('After searching, dropdown opens up', async () => {
  const input = document.querySelector('input');
  input.value = 'test';
  input.dispatchEvent(new Event('input'));
  await waitFor('.dropdown-item');
  const dropdown = document.querySelector('.dropdown');
  expect(dropdown.className).to.include('is-active');
});

it('After searching, display some results', async () => {
  const input = document.querySelector('input');
  input.value = 'test';
  input.dispatchEvent(new Event('input'));
  await waitFor('.dropdown-item');
  const items = document.querySelectorAll('.dropdown-item');
  expect(items.length).to.equal(3);
});

it('Bypass', async () => {
  // by pass
});