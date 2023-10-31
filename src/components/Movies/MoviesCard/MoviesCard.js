import {isMovieSaved} from '../../../utils/filmFunction';

function MoviesCard({ movie, handleToggleSave, saveMovies, viewMode }) {
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;
  let valueBtn = 'Сохранить';

	function btnClassName() {
		if (viewMode === "allMovies" && isMovieSaved(movie, saveMovies)) {
      valueBtn = '';
			return "card__btn_saved";
		}
    if (viewMode === "savedMovies") {
      valueBtn = "";
      return "card__btn_type_delete"
    }
    return '';
    
	}

	function handleMovieSave() {
		handleToggleSave(movie);
	}
  
  return (
    <li className="card">
      <div className='card__image_container'>
        <a href={movie.trailerLink} target='_blank' rel="noreferrer">
          <img src={movie.imageFull} alt={movie.nameRu} className="card__image" />
        </a>
        <button
          type='button'
          onClick={handleMovieSave}
          className={`card__btn ${btnClassName()}`}>
          {valueBtn}
        </button>
      </div>

      <div className="card__header">
        <h2 className="card__title">{movie.nameRU}</h2>
        <p className="card__duration">{`${hours}ч ${minutes}м`}</p>
      </div>
    </li>
  )
}

export default MoviesCard;
