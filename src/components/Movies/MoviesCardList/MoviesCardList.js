import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, handleToggleSave, saveMovies, viewMode }) {

  return(
    <section className="movies-card">
      <ul className="movies-card__list">
				{movies.map((movie) => (
          <MoviesCard
            key={movie.reactKey}
            movie={movie}
            handleToggleSave={handleToggleSave}
            saveMovies={saveMovies}
            viewMode={viewMode}
          />
        ))}
      </ul>
    </section>
  )
}

export default MoviesCardList;
