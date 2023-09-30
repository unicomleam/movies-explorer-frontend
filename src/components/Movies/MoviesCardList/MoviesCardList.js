import MoviesCard from "../MoviesCard/MoviesCard"

function MoviesCardList({ cardList, typeCardBtn }) {

  return(
    <section className="movies-card">
      <ul className="movies-card__list">
        {cardList.map(card => (
          <MoviesCard
            key={card.movieId}
            movieId={card.movieId}
            duration={card.duration}
            image={card.image}
            name={card.nameRU}
            typeCardBtn={typeCardBtn}
          />
        ))}
      </ul>
      {cardList.length > 3 &&
        <div className="movies-card__more">
          <button type='button' className="movies-card__more-btn">Ещё</button>
        </div>
      }
    </section>
  )
}

export default MoviesCardList;
