import axios from 'axios';

const TMDB = 'https://api.themoviedb.org/3/movie/';

export default class Sync {
  static getMoviesNew = async () => {
    try {
      const randomMovieE = await axios.get(
        `${TMDB}now_playing?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`,
      );
      if (randomMovieE) {
        return randomMovieE;
      } else {
        alert('no data');
      }
    } catch (err) {
      console.error(err);
    }
  };

  static getMoviesPopular = async () => {
    try {
      const randomMovieE = await axios.get(
        `${TMDB}popular?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`,
      );
      if (randomMovieE) {
        return randomMovieE;
      } else {
        alert('no data');
      }
    } catch (err) {
      console.error(err);
    }
  };
}
