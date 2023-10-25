import { useState } from 'react';
import Header from '../Header/Header.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import Footer from '../Footer/Footer';
import { movieFilter } from '../../utils/filmFunction';

function SavedMovies({ handleToggleSave, saveMovies }) {
  const [onlyShortMovies, setOnlyShortMovies] = useState(false);
	const [searchString, setSearchString] = useState('');
	const [isEmptyInput, setIsEmptyInput] = useState(false);

	function moviesToRender() {
		const result = saveMovies.filter((movie) => { return movieFilter(movie, searchString, onlyShortMovies) });
		result.forEach((movie) => {
			movie.imageFull = movie.image;
			movie.thumbnailFull = movie.thumbnail;
			movie.reactKey = movie._id;
			movie.id = movie.movieId;
		}
		);
		return result;
	}

	function handleSearch(searchString, onlyShortMovies) {
		setSearchString(searchString);
		setOnlyShortMovies(onlyShortMovies);
	}

  return (
    <div className="page">
      <Header theme={{ default: false }} />
      <main className="main">
        <SearchForm onSearch={handleSearch} viewMode="savedMovies" isEmptyInput={isEmptyInput} onEmptyInput={setIsEmptyInput} />

        {moviesToRender().length === 0 &&
					<p className="movies-card-list__error-text">Сохраненных фильмов нет</p>
        }

				{searchString === "" &&
					isEmptyInput &&
					<p className="movies-card-list__error-text">Введите ключевое слово для поиска.</p>
        }

				{(moviesToRender().length > 0) &&
					<MoviesCardList
						movies={moviesToRender()}
						handleToggleSave={handleToggleSave}
						viewMode="savedMovies"
					/>}

      </main>
      <Footer />
    </div>
  )
}

export default SavedMovies;
