import { saveCardList } from '../../../utils/cardList';
import { Link } from 'react-router-dom';

function MoviesCard({ movieId, image, name, typeCardBtn }) {
  const isSavedMovieCard = saveCardList.some(i => i.movieId === movieId);

  return (
    <li className="card">
      <div className='card__image_container'>
        <Link to={'/'} target='_blank'>
          <img src={image} alt={name} className="card__image" />
        </Link>
        <button
          type='button'
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
      </div>

      <div className="card__header">
        <h2 className="card__title">{name}</h2>
        <p className="card__duration">1ч 36м</p>
      </div>
    </li>
  )
}

export default MoviesCard;
