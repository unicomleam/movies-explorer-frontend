const movieApiConfig = {
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
};

class MoviesApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getMovies() {
    return fetch(this._url, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  };

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(res.status)
  };
}

const moviesApi = new MoviesApi(movieApiConfig);
export default moviesApi;
