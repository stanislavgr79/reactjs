import { IMovie } from '../../helpers/interface';
export const ACTION_ADD_TO_MOVIES = 'ACTION_ADD_TO_MOVIES';
export const ACTION_REMOVE_FROM_MOVIES = 'ACTION_REMOVE_FROM_MOVIES';
export const UPDATE_MOVIE_IN_MOVIES = 'UPDATE_MOVIE_IN_MOVIES';
export const UPDATE_STATUS_MOVIE_POPUP = 'UPDATE_MOVIE_POPUP';

const initialState = {
  movies: require('../../resources/movies.json'),
  moviesIsLoading: true,
  showPopup: false,
};

function transformGenresToStringArray(movie: IMovie) {
  const tempMovie = movie;
  const genresArray: string[] = [];
  movie.genres.map((it) => genresArray.push(it.value));
  tempMovie.genres = genresArray;
  return tempMovie;
}

export const reducerMovies = (state = initialState, action: { type: string, payload: IMovie }) => {
  switch (action.type) {
    case UPDATE_STATUS_MOVIE_POPUP:
      return {
        ...state,
        showPopup: action.payload,
      };
    case ACTION_ADD_TO_MOVIES:
      const movie = transformGenresToStringArray(action.payload);
      return {
        ...state,
        movies: [...state.movies, movie],
      };
    case ACTION_REMOVE_FROM_MOVIES:
      const id = action.payload;
      return {
        ...state,
        movies: state.movies.filter((movie: IMovie) => movie.id !== id),
      };
    case UPDATE_MOVIE_IN_MOVIES:
      const index = state.movies.findIndex((movie: IMovie) => movie.id == action.payload.id);
      const newArray = [...state.movies];
      const tempMovie = action.payload;
      newArray[index] = tempMovie;
      return {
        ...state,
        movies: newArray,
      };
    default:
      return state;
  }
};
