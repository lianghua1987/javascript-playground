const searchMovieByTitle = async (title) => {
  const {data} = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "1e4f7e23",
      s: title
    }
  });
  console.log(data);
}

const searchMovieById = async (id) => {
  const {data} = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "1e4f7e23",
      i: id
    }
  });
  console.log(data);
}

const input = document.querySelector('input');

const debounce = (fn, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  }
};

let timeoutId;

const onInputDeprecated = e => {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    searchMovieByTitle(e.target.value);
  }, 500);
}

const onInput = debounce(e => {
  searchMovieByTitle(e.target.value);
}, 500);

input.addEventListener('input', onInput);