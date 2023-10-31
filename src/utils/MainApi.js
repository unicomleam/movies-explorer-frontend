class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  };

  getAllSavedMovies() {
    return fetch(`${this._url}/movies`, {
      credentials: 'include',
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  };

  saveMovie(movieData) {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      id,
      nameRU,
      nameEN,
    } = movieData;

    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: movieApiUrl + image.url,
        trailerLink,
        thumbnail: movieApiUrl + image.formats.thumbnail.url,
        movieId: id,
        nameRU,
        nameEN,
      })
    })
    .then(res => this._checkResponse(res));
  };

  deleteSavedMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
    .then(err => this._checkResponse(err));
  };

  _checkResponse(res) {
    if(res.ok) {
      return res.json()
    }

    return Promise.reject(res.status)
  };
}

const movieApiUrl = 'https://api.nomoreparties.co';

const mainApi = new MainApi({
  url: 'https://api.unicomleam.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
});

export default mainApi;
