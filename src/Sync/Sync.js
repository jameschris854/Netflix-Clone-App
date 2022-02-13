import axios from 'axios';
import commonStore from '../store/commonStore';

const TMDB = 'https://api.themoviedb.org/3/';
const API_KEY = '6a1058b7c16297df1884a589ce62565b';

export default class Sync {
  static getMoviesNew = async () => {
    let apiType = commonStore.apiType;
    let apiStr =
      apiType === 'tv' ? `${apiType}/airing_today` : `${apiType}/upcoming`;

    try {
      const randomMovieE = await axios.get(
        `${TMDB}${apiStr}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`,
      );
      if (randomMovieE) {
        return randomMovieE;
      } else {
        alert('no data');
      }
    } catch (err) {
      console.error('getMoviesNew', err);
    }
  };

  static getMoviesPopular = async (page = 1) => {
    let apiType = commonStore.apiType;
    let apiStr = apiType === 'tv' ? `${apiType}/popular` : `${apiType}/popular`;

    try {
      const randomMovieE = await axios.get(
        `${TMDB}${apiStr}?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false`,
      );

      if (randomMovieE) {
        return randomMovieE;
      } else {
        alert('no data');
      }
    } catch (err) {
      console.error('getMoviesPopular', err);
    }
  };

  static trendingList = async () => {
    let apiType = commonStore.apiType;
    let apiStr =
      apiType === 'tv' ? `${apiType}/top_rated` : `${apiType}/now_playing`;
    try {
      const randomMovieE = await axios.get(
        `${TMDB}${apiStr}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`,
      );

      if (randomMovieE) {
        return randomMovieE;
      } else {
        alert('no data');
      }
    } catch (err) {
      console.error('getMoviesPopular', err);
    }
  };

  static getDetails = async id => {
    let apiType = commonStore.apiType;

    try {
      const details = await axios.get(
        `${TMDB}${apiType}/${id}?api_key=${API_KEY}&language=en-US`,
      );
      return details;
    } catch (err) {
      console.error('details1', err);
    }
  };

  static getCredits = async id => {
    let apiType = commonStore.apiType;

    try {
      const credits = await axios.get(
        `${TMDB}${apiType}/${id}/credits?api_key=${API_KEY}&language=en-US`,
      );
      return credits;
    } catch (err) {
      console.error('getCredits', err);
    }
  };

  static getSimilar = async id => {
    let apiType = commonStore.apiType;

    try {
      const similar = await axios.get(
        `${TMDB}${apiType}/${id}/similar?api_key=${API_KEY}&language=en-US`,
      );
      return similar;
    } catch (err) {
      console.error('getSimilar', err);
    }
  };

  static getReviews = async id => {
    let apiType = commonStore.apiType;

    try {
      const reviews = await axios.get(
        `${TMDB}${apiType}/${id}/reviews?api_key=${API_KEY}&language=en-US`,
      );
      return reviews;
    } catch (err) {
      console.error('getReviews', err);
    }
  };

  static getGenre = async () => {
    let apiType = commonStore.apiType;

    try {
      const genre = await axios.get(
        `${TMDB}genre/${apiType}/list?api_key=${API_KEY}&language=en-US`,
      );
      return genre;
    } catch (err) {
      console.error('getGenre', err);
    }
  }
}
