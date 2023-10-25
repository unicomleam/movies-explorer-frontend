import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import { movieFilter } from '../../utils/filmFunction';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';

function Movies({ isLoad, setIsLoad, saveMovies, handleToggleSave }) {
  const [serverResponseError, setServerResponseError] = useState(false);
	const [searchData, setSearchData] = useState({});
	const [maximunCardCount, setMaximunCardCount] = useState(getRenderMoviesOptions().initialCount);
	const [isEmptyInput, setIsEmptyInput] = useState(false);
	const [isFirstVisit, setIsFirstVisit] = useState(true);

  function getRenderMoviesOptions() {
		const width = window.innerWidth
		let initialCount;
		let extraCount;

		if (width >= 1024) {
			initialCount = 12;
			extraCount = 3;
		} else {
			if (width >= 655 && width < 1024) {
				initialCount = 8;
				extraCount = 2;
			} else {
				initialCount = 5;
				extraCount = 2;
			}
		} return { initialCount, extraCount };
	};

	useEffect(() => {
		const moviesSearchData = localStorage.getItem('MoviesSearchData');
		if (moviesSearchData) {
			setSearchData(JSON.parse(moviesSearchData));
		};
		setIsFirstVisit(localStorage.getItem('firstVisit', 'true'));
	}, []);

	function moviesToRender() {
		const result = (searchData.searchResult ?? []).slice(0, maximunCardCount);
		result.forEach((item) => {
			item.imageFull = `https://api.nomoreparties.co${item.image.url}`;
			item.thumbnailFull = `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`;
			item.reactKey = item.id;
		});
		return result;
	}

	function actualizeMoviesSearchData(searchString, onlyShortMovies, allMovies) {
		const searchResult = allMovies.filter((item) => { return movieFilter(item, searchString, onlyShortMovies) });
		return { searchString, onlyShortMovies, searchResult, apiResult: allMovies };
	}

	function handleSearch(searchString, onlyShortMovies) {
		setMaximunCardCount(getRenderMoviesOptions().initialCount);
		const moviesSearchData = JSON.parse(localStorage.getItem('MoviesSearchData'));

		if (moviesSearchData) {
			const newSearchData = actualizeMoviesSearchData(searchString, onlyShortMovies, moviesSearchData.apiResult);
			localStorage.setItem('MoviesSearchData', JSON.stringify(newSearchData));
			setSearchData(newSearchData);
		} else {
			setServerResponseError(false);
			setIsLoad(true);
			moviesApi.getMovies()
				.then((result) => {
					const newSearchData = actualizeMoviesSearchData(searchString, onlyShortMovies, result);
					localStorage.setItem('MoviesSearchData', JSON.stringify(newSearchData));
					setSearchData(newSearchData);
					if (!isFirstVisit) {
						setIsFirstVisit(true);
						localStorage.setItem('firstVisit', 'false');
						} else {
						localStorage.setItem('firstVisit', isFirstVisit);
						}
				})
				.catch((err) => {
					console.log(err);
					setServerResponseError(true);
				})
				.finally(() => setIsLoad(false));
		}
	}

	function handleShowMore() {
		setMaximunCardCount(maximunCardCount + getRenderMoviesOptions().extraCount);
	}

  return (
    <div className="page">
      <Header theme={{ default: false }} />
      <main className="main">
        <SearchForm
          onSearch={handleSearch}
          searchString={searchData.searchString ?? ""}
			    onlyShortMovies={searchData.onlyShortMovies ?? ""}
		      viewMode="allMovies"
					isEmptyInput={isEmptyInput}
					onEmptyInput={setIsEmptyInput}
					isFirstVisit={isFirstVisit}
        />

        {isLoad && <Preloader />}

        {(!isLoad) &&
          (isFirstVisit) &&
          moviesToRender().length === 0 &&
          <p className="movies-card__error">Ничего не найдено</p>
        }

        {(!isLoad) &&
          (searchData.searchString ?? {}) &&
          (!isFirstVisit) &&
          moviesToRender().length === 0 &&
          <p className="movies-card-list__error-text">Введите ключевое слово для поиска.</p>
        }

        {searchData.searchString === "" &&
          <p className="movies-card-list__error-text">Введите ключевое слово для поиска.</p>
        }

        {serverResponseError &&
          <p className="movies-card-list__error-text">500 На сервере произошла ошибка.</p>
        }

        {(!isLoad) &&
					(moviesToRender().length > 0) &&
					searchData.searchString !== "" &&
					<MoviesCardList
            typeCardBtn={{save: true}}
            movies={moviesToRender()}
            handleToggleSave={handleToggleSave}
            saveMovies={saveMovies}
            viewMode="allMovies"
          />}
        
        {(!isLoad) &&
				  ((searchData.searchResult ?? []).length > maximunCardCount) &&
				  searchData.searchString !== "" &&
          <div className="movies-card__more">
            <button type='button' onClick={handleShowMore} className="movies-card__more-btn">Ещё</button>
          </div>
        }

      </main>
      <Footer />
    </div>
  )
}

export default Movies;
