function SearchForm() {
  return(
    <form className="search-form">

      <label className="search-form__wrapper">
        <input type="text" placeholder="Фильм" className="search-form__input" required />
        <button className="search-form__submit-btn" />
      </label>

      <label className="search-form__filter">
        <input type="checkbox" name="short-film-toggle" id="short-film-toggle" className="search-form__checkbox" />
        <label className="search-form__checkbox-label" htmlFor="short-film-toggle"/>
        <p className="search-form__short-film-text">Короткометражки</p>
      </label>

    </form>
  )
}

export default SearchForm;
