class Auth{
  constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
    }
  
    registerUser({ name, email, password }) {
      return fetch(`${this._url}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, email, password })
      })
      .then(res => this._checkResponse(res))
    }
  
    loginUser({ email, password }) {
      return fetch(`${this._url}/signin`, {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })
      .then(res => this._checkResponse(res))
    }
  
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers,
        credentials: 'include',
      })
      .then(res => this._checkResponse(res));
    };
  
    updateUserInfo({ name, email }) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name, email })
      })
      .then(res => this._checkResponse(res));
    };

    _checkResponse(res) {
      if(res.ok) {
        return res.json()
      }
  
      return Promise.reject(`Ошибка: ${res.status}`)
    }
};

const auth = new Auth({
  url: "https://api.unicomleam.nomoredomainsicu.ru",
  headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
  }
});

export default auth;
