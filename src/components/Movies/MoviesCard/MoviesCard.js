import { saveCardList } from '../../../utils/cardList';

function MoviesCard({ movieId, image, name, typeCardBtn }) {
  const isSavedMovieCard = saveCardList.some(i => i.movieId === movieId);

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">
          {name}
        </h2>
        <p className="card__duration">1ч 36м</p>
      </div>
      <img
        src={image}
        alt={name}
        className="card__img"
        />
      <button
        className={`card__btn ${
          !typeCardBtn.save
            ? 'card__btn_type_delete'
            : isSavedMovieCard
            ? 'card__btn_saved'
            : ''
        }`}>
        {!typeCardBtn.save || isSavedMovieCard
          ? ''
          : 'Сохранить'}
      </button>
    </li>
  )
}

export default MoviesCard;
