import { useContext, useEffect, useState } from 'react';

import Header from '../Header/Header.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import Footer from '../Footer/Footer';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { saveCardList } from '../../utils/cardList.js';

function SavedMovies() {
  const { loggeIn } = useContext(CurrentUserContext);
  const [ saveCards, setSaveCards ] = useState([]);

  useEffect(() => {
    if (loggeIn) {
      setSaveCards(saveCardList);
    }
  }, [loggeIn])

  return (
    <div className="page">
      <Header theme={{ default: false }} />
      <SearchForm />
      <MoviesCardList cardList={saveCards} typeCardBtn={{save: false}} />
      <Footer />
    </div>
  )
}

export default SavedMovies;
