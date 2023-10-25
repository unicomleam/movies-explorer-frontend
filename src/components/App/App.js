import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi';
import auth from '../../utils/Auth';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { getMovieMyId, isMovieSaved } from '../../utils/filmFunction';

function App() {
  const navigate = useNavigate();
  const[ currentUser, setCurrentUser ] = useState({
    name: null,
    email: null,
    loggeIn: false,
  });
  const [ isLoad, setIsLoad ] = useState(false);
  const [ saveMovies, setSaveMovies ] = useState([]);
  const [ requestError, setRequestError ] = useState(null);

  useEffect(() => {
    function tokenCheck() {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        return auth.getUserInfo(jwt).then(userInfo => {
          setCurrentUser({ ...userInfo, loggeIn: true }); 
        })
        .catch(console.error);
      }
    }
    tokenCheck();
    loadSavedMovies();
  }, [])

  const handleToggleIsLoad = (value) => {
    setIsLoad(value);
  }

  function loadSavedMovies() {
		mainApi.getAllSavedMovies()
			.then((moviesResponse) => {
				setSaveMovies(moviesResponse);
			})
			.catch((err) => console.log(err));
	}

  function handleToggleSave(movie) {
		if (!isMovieSaved(movie, saveMovies)) {
			mainApi.saveMovie(movie)
				.then((result) => setSaveMovies([result, ...saveMovies]))
				.catch((err) => console.log(err));
		}
		else {
			const myId = getMovieMyId(movie, saveMovies);
			mainApi.deleteSavedMovie(myId)
				.then(() => setSaveMovies(saveMovies.filter((item) => { return item._id !== myId })))
				.catch((err) => console.log(err));
		}
	};

  const setClearValues = () => {
    const movieArrs = [ setSaveMovies ];
    const valueArrs = [ setIsLoad, setRequestError ];

    movieArrs.forEach(i => i([]));
    valueArrs.forEach(i => i(null));
    setCurrentUser({
      name: '',
      email: '',
      loggeIn: false,
    });

    localStorage.clear("jwt");
    localStorage.clear("MoviesSearchData");
    localStorage.clear('firstVisit');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<Main />} />

        <Route
          path='/movies'
          element={<ProtectedRouteElement
            isLoad={isLoad}
            setIsLoad={handleToggleIsLoad}
            element={Movies}
            saveMovies={saveMovies}
            handleToggleSave={handleToggleSave}
          />}
        />

        <Route path='/saved-movies' element={<ProtectedRouteElement
          isLoad={isLoad}
          setIsLoad={handleToggleIsLoad}
          saveMovies={saveMovies}
          handleToggleSave={handleToggleSave}
          element={SavedMovies}
          />}
        />

        <Route path='/profile' element={<ProtectedRouteElement
          isLoad={isLoad}
          setIsLoad={setIsLoad}
          element={Profile}
          setCurrentUser={setCurrentUser}
          navigate={navigate}
          setClearValues={setClearValues}
          />}
        />

        <Route path='/signin' element={!currentUser.loggeIn
          ?
            <Login
              isLoad={isLoad}
              setIsLoad={setIsLoad}
              setCurrentUser={setCurrentUser}
              navigate={navigate}
              requestError={requestError}
              setRequestError={setRequestError}
            />
          :
            <Navigate to='/movies'/>
          }/>

        <Route path='/signup' element={!currentUser.loggeIn
          ?
            <Register
              isLoad={isLoad}
              setIsLoad={setIsLoad}
              setCurrentUser={setCurrentUser}
              navigate={navigate}
              requestError={requestError}
              setRequestError={setRequestError}
            />
          :
            <Navigate to='/movies'/>
          }/>

        <Route path='*' element={<NotFound />} />

      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
