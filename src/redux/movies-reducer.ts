import { IMovie } from '../helpers/interface';
const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';

const initialState = {
  movies: require('../resources/movies.json'),
};

const reducerMovies = (
  state = initialState.movies,
  action: { type: string, payload: IMovie[] },
) => {
  switch (action.type) {
    case GET_MOVIE_SUCCESS:
      return { ...state, movies: action.payload };
    default:
      return state;
  }
};

export default reducerMovies;
