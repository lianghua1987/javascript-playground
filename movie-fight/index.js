import OMDB_API_KEY from "./env.js";

const OMDBAPI_ENDPOINT = "http://www.omdbapi.com/";

const movieDetailTemplate = (title, label, value) => {
  return `
    <article class="notification is-primary" data-value = "${value}">
        <p class="title">${title}</p>
        <p class="subtitle">${label}</p>
    </article>
  `;
}

const movieTemplate = movie => {
  const dollars = movie.BoxOffice.replace(/\$/g, '').replace(/,/g, '');
  const metascore = parseInt(movie.Metascore);
  const imdbRating = parseFloat(movie.imdbRating);
  const imdbVotes = parseInt(movie.imdbVotes.replace(/,/g, ''));
  const awards = movie.Awards.split(' ').map(str => Number(str)).filter(n => !isNaN(n)).reduce((prev, curr) => prev + curr);
  return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src = "${movie.Poster}"/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
             <h1>${movie.Title}</h1>
             <h4>${movie.Genre}</h4>
             <p>${movie.Plot}</p>
            </div>
        </div>
    </article>
    ${movieDetailTemplate(movie.Awards, 'Awards', awards)}
    ${movieDetailTemplate(movie.BoxOffice, 'Box Office', dollars)}
    ${movieDetailTemplate(movie.Metascore, 'Metascore', metascore)}
    ${movieDetailTemplate(movie.imdbRating, 'IMDB Rating', imdbRating)}
    ${movieDetailTemplate(movie.imdbVotes, 'IMDB Votes', imdbVotes)}
  `;
};

const searchMovieByTitle = async (title) => {
  const response = await axios.get(OMDBAPI_ENDPOINT, {
    params: {
      apikey: OMDB_API_KEY,
      s: title
    }
  });
  return response.data.Search || [];
};

const searchMovieById = async (id) => {
  const {data} = await axios.get(OMDBAPI_ENDPOINT, {
    params: {
      apikey: OMDB_API_KEY,
      i: id
    }
  });
  return data || {};
};

let leftMovie, rightMovie;
const onMovieSelect = async (movie, target, side) => {

  const movieDetail = await searchMovieById(movie.imdbID);
  target.innerHTML = movieTemplate(movieDetail);

  if (side === 'left') {
    leftMovie = movieDetail;
  } else {
    rightMovie = movieDetail;
  }

  if (leftMovie && rightMovie) {
    const l = document.querySelectorAll('#left-summary .notification');
    const r = document.querySelectorAll('#right-summary .notification');
    compare(l, r);
  }
};

const compare = (l, r) => {
  l.forEach((lElem, index) => {
    const rElem = r[index];
    const lValue = parseInt(lElem.dataset.value);
    const rValue = parseInt(rElem.dataset.value);
    if (rValue > lValue) {
      lElem.classList.remove('is-primary');
      lElem.classList.add('is-warning');
    } else {
      rElem.classList.remove('is-primary');
      rElem.classList.add('is-warning');
    }
  })
}

const autoCompleteConfig = {
  renderOption: movie => {
    return `
      <img src = "${movie.Poster === 'N/A' ? '' : movie.Poster}"/>
      ${movie.Title} (${movie.Year})
    `
  },
  onSearch: searchMovieByTitle,
  displayName: movie => movie.Title
};


createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onSelect: async movie => {
    document.querySelector('.tutorial').classList.add('is-hidden');
    await onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  },
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onSelect: async movie => {
    document.querySelector('.tutorial').classList.add('is-hidden');
    await onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
});



