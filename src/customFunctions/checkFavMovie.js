const checkFavMovie = (movieId, favouritesMovies) => {
  let isFav = false;
  favouritesMovies.forEach((favMovie) => {
    if (favMovie.imdbID == movieId) isFav = true;
  });
  return isFav;
};

export default checkFavMovie;
