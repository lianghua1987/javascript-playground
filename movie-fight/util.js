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
  timeoutId = setTimeout(async () => {
    const movies = await searchMovieByTitle(e.target.value);
    console.log(movies);
  }, 500);
}