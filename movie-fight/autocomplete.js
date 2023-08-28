const createAutoComplete = ({root, renderOption, onSelect, onSearch, displayName}) => {
  root.innerHTML = `
    <label><b>Search for a movie</b></label>
    <input class="input"/>
    <div class="dropdown">
      <div class="dropdown-menu">
          <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const results = root.querySelector('.results');

  const onInput = debounce(async e => {
    const items = await onSearch(e.target.value);
    if (!items.length) {
      dropdown.classList.remove('is-active');
      return
    }
    results.innerHTML = '';
    dropdown.classList.add('is-active');

    for (let item of items) {
      const option = document.createElement('a');
      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      option.addEventListener('click', e => {
        dropdown.classList.remove('is-active');
        input.value = displayName(item);
        onSelect(item);
      });
      results.append(option);
    }
  }, 500);

  input.addEventListener('input', onInput);

  document.addEventListener('click', e => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove('is-active');
    }
  });
}