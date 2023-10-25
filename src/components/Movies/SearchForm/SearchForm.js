import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearch, viewMode, onEmptyInput, isFirstVisit }) {
  const [searchString, setSearchString] = useState('');
	const [onlyShortMovies, setOnlyShortMovies] = useState(false);

	const location = useLocation();

	useEffect(() => {
		if (viewMode === "allMovies") {
			const moviesSearchData = localStorage.getItem('MoviesSearchData');

			if (moviesSearchData) {
				const parsedSearchData = JSON.parse(moviesSearchData)
				setSearchString(parsedSearchData.searchString);
				setOnlyShortMovies(parsedSearchData.onlyShortMovies);
			}
		}
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		onSearch(searchString, onlyShortMovies);
		onEmptyInput(false)

		if (searchString === "") {
			onEmptyInput(true)
		};
	};

	function handleCheckbox(e) {
		if (location.pathname === '/movies' && !isFirstVisit) {
			return
		} else {
			setOnlyShortMovies(e.target.checked);
			onSearch(searchString, e.target.checked);
		}
	};

	function handleTextInputChange(e) {
		setSearchString(e.target.value);
	};
  
  return(
    <section className="search-form">
      <form onSubmit={handleSubmit} noValidate>

        <label className="search-form__wrapper">
          <input type="search"
            className="search-form__input"
            placeholder="Фильм"
            name="searchInput"
            minLength={1}
            maxLength={24}
            value={searchString}
            onChange={handleTextInputChange}
            required={true}/>
          <button type='submit' className="search-form__submit-btn" />
        </label>

        <label className="search-form__filter">
          <input type="checkbox" name="checkbox" checked={onlyShortMovies} onChange={handleCheckbox} id="checkbox" className="search-form__checkbox" />
          <label className="search-form__checkbox-label" htmlFor="checkbox"/>
          <p className="search-form__short-film-text">Короткометражки</p>
        </label>

      </form>
    </section>
  )
}

export default SearchForm;
