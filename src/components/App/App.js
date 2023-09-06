import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {
  const [ currentUser, setCurrentUser ] = useState({
    name: 'unicomleam',
    email: 'test@mail.ru',
    loggeIn: true,
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<Main/>} />

        <Route path='/movies' element={<Movies/>} />

        <Route path='/saved-movies' element={<SavedMovies/>} />

        <Route path='/profile' element={<Profile/>} />

        <Route path='/signin' element={<Login/>} />

        <Route path='/signup' element={<Register/>}/>

      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
