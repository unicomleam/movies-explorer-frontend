import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

function App() {
  const [ currentUser, setCurrentUser ] = useState({
    name: 'unicomleam',
    email: 'test@mail.ru',
    loggeIn: true,
  });

  function logout() {
    setCurrentUser({ loggeIn: false });
  }

  function login() {
    setCurrentUser({
      name: 'unicomleam',
      email: 'test@mail.ru',
      loggeIn: true
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<Main/>} />

        <Route path='/movies' element={<Movies/>} />

        <Route path='/saved-movies' element={<SavedMovies/>} />

        <Route path='/profile' element={<Profile logout={logout} />} />

        <Route path='/signin' element={<Login login={login} />} />

        <Route path='/signup' element={<Register/>} />

        <Route path='*' element={<NotFound/>} />

      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
