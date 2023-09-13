function SearchForm() {
  return(
    <section className="search-form">
      <form>

        <label className="search-form__wrapper">
          <input type="text"
            className="search-form__input"
            placeholder="Фильм"
            minLength={2}
            maxLength={24}
            required />
          <button className="search-form__submit-btn" />
        </label>

        <label className="search-form__filter">
          <input type="checkbox" name="short-film-toggle" id="short-film-toggle" className="search-form__checkbox" />
          <label className="search-form__checkbox-label" htmlFor="short-film-toggle"/>
          <p className="search-form__short-film-text">Короткометражки</p>
        </label>

      </form>
    </section>
  )
}

export default SearchForm;
