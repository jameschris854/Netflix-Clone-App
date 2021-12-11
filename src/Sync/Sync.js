import axios from 'axios'


export default class Sync {
  static getMovies = async () => {
    try {
      const randomMovieE = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`,
      );
      if(randomMovieE){
        return randomMovieE;
      }else{
        alert('no data')
      }
      // let translatedMovie =await translate.translate('ta',randomMovieT.data.results[1].title)
      // console.log(translatedMovie);
    } catch (err) {
      console.error(err);
    }
  };
}
