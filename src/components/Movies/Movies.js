import { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { cardList } from '../../utils/cardList';

function Movies() {
  const { loggeIn } = useContext(CurrentUserContext);
  const [ cards, setCards ] = useState([]);

  useEffect(() => {
    if (loggeIn) {
      setCards(cardList);
    }
  }, [loggeIn])

  return(
    <div className="page">
      <Header theme={{ default: false }} />
      <main className="main">
        <SearchForm />
        <MoviesCardList cardList={cards} typeCardBtn={{save: true}} />
      </main>
      <Footer />
    </div>
  )
}

export default Movies;
