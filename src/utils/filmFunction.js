export function isMovieSaved(testMovie, savedMovies) {
	return savedMovies.some((item) => { return item.movieId === testMovie.id });
};

export function getMovieMyId(testMovie, savedMovies) {
	let result;
	savedMovies.forEach((item) => { if (item.movieId === testMovie.id) { result = item._id } });
	return result;
};

export function movieFilter(item, searchString, onlyShortMovies) {
	return (
	  (
		item.nameRU.toLowerCase().includes(searchString.toLowerCase()) || 
		item.nameEN.toLowerCase().includes(searchString.toLowerCase())
	  ) &&
	  (
		onlyShortMovies === false || item.duration <= 40
	  )
	);
  };
