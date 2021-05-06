import reducer from '../movies-reducer';
import * as types from '../../types/movies-reducer-types';

const state: types.MoviesState = {
  movies: {
    totalAmount: 0,
    data: [],
    offset: 0,
    limit: 6,
  },
  dataStatus: 'idle',
  error: null,
  showPopup: false,
  selectedMovieId: 0,
  movie: undefined,
  newPage: true,
};

const movie = {
  id: 12345,
  title: 'title',
  release_date: '21-01-02',
  genres: ['CRIME'],
  overview: 'overview',
  runtime: 66,
};

describe('movies-reducer', () => {
  it('should handle FETCH_DATA', () => {
    const initialState: types.MoviesState = state;
    expect(
      reducer(initialState, {
        type: types.FETCH_DATA,
      }),
    ).toEqual({
      movies: {
        totalAmount: 0,
        data: [],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'loading',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: true,
    });
  });

  it('should handle FETCH_DATA_SUCCESS', () => {
    const initialState: types.MoviesState = state;
    expect(
      reducer(initialState, {
        type: types.FETCH_DATA_SUCCESS,
        payload: {
          totalAmount: 1,
          data: [movie],
          offset: 0,
          limit: 6,
        },
      }),
    ).toEqual({
      movies: {
        totalAmount: 1,
        data: [movie],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'success',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: true,
    });
  });

  it('should handle FETCH_DATA_FAILURE', () => {
    const initialState: types.MoviesState = state;
    expect(
      reducer(initialState, {
        type: types.FETCH_DATA_FAILURE,
        payload: {
          error: 'error',
        },
      }),
    ).toEqual({
      movies: {
        totalAmount: 0,
        data: [],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'failed',
      error: 'error',
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: true,
    });
  });

  it('should handle DELETE_MOVIE_SUCCESS', () => {
    const initialStateBefore: types.MoviesState = {
      movies: {
        totalAmount: 1,
        data: [movie],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'success',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: false,
    };

    expect(
      reducer(initialStateBefore, {
        type: types.DELETE_MOVIE_SUCCESS,
        payload: 12345,
      }),
    ).toEqual({
      movies: {
        totalAmount: 0,
        data: [movie],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'success',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: false,
    });
  });

  it('should handle FETCH_GET_MOVIE_SUCCESS', () => {
    const initialState: types.MoviesState = state;
    expect(
      reducer(initialState, {
        type: types.FETCH_GET_MOVIE_SUCCESS,
        payload: movie,
      }),
    ).toEqual({
      movies: {
        totalAmount: 1,
        data: [movie],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'success',
      error: null,
      showPopup: true,
      selectedMovieId: 12345,
      movie: movie,
      newPage: false,
    });
  });

  it('should handle FETCH_GET_MOVIE_FAILED', () => {
    const initialState: types.MoviesState = {
      movies: {
        totalAmount: 0,
        data: [],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'idle',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: true,
    };
    expect(
      reducer(initialState, {
        type: types.FETCH_GET_MOVIE_FAILED,
        payload: {
          message: 'error',
        },
      }),
    ).toEqual({
      movies: {
        totalAmount: 0,
        data: [],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'failed',
      error: 'error',
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: true,
    });
  });

  it('should handle FETCH_ADD_MOVIE_SUCCESS', () => {
    const initialStateBefore: types.MoviesState = {
      movies: {
        totalAmount: 1,
        data: [movie],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'success',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: false,
    };

    expect(
      reducer(initialStateBefore, {
        type: types.FETCH_ADD_MOVIE_SUCCESS,
        payload: movie,
      }),
    ).toEqual({
      movies: {
        totalAmount: 2,
        data: [movie],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'success',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: false,
    });
  });

  it('should handle UPDATE_MOVIE_SUCCESS', () => {
    const initialStateBefore: types.MoviesState = {
      movies: {
        totalAmount: 1,
        data: [
          {
            id: 12345,
            title: 'titleBefore',
            release_date: '21-01-02',
            genres: ['NONE'],
            overview: 'none',
            runtime: 0,
          },
        ],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'success',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: false,
    };

    expect(
      reducer(initialStateBefore, {
        type: types.UPDATE_MOVIE_SUCCESS,
        payload: movie,
      }),
    ).toEqual({
      movies: {
        totalAmount: 1,
        data: [movie],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'success',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: false,
    });
  });

  it('should handle UPDATE_STATUS_MOVIE_POPUP', () => {
    const initialState: types.MoviesState = {
      movies: {
        totalAmount: 0,
        data: [],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'idle',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: true,
    };
    expect(
      reducer(initialState, {
        type: types.UPDATE_STATUS_MOVIE_POPUP,
        payload: true,
      }),
    ).toEqual({
      movies: {
        totalAmount: 0,
        data: [],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'idle',
      error: null,
      showPopup: true,
      selectedMovieId: 0,
      movie: undefined,
      newPage: true,
    });
  });

  it('should handle UPDATE_SELECTED_MOVIE_ID', () => {
    const initialState: types.MoviesState = {
      movies: {
        totalAmount: 0,
        data: [movie],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'idle',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: true,
    };
    expect(
      reducer(initialState, {
        type: types.UPDATE_SELECTED_MOVIE_ID,
        payload: 0,
      }),
    ).toEqual({
      movies: {
        totalAmount: 0,
        data: [movie],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'idle',
      error: null,
      showPopup: false,
      selectedMovieId: 0,
      movie: undefined,
      newPage: false,
    });
  });

  it('should handle UPDATE_SELECTED_MOVIE_ID', () => {
    const movieExpected = {
      id: 98765,
      title: 'title',
      release_date: '21-01-02',
      genres: ['CRIME'],
      overview: 'overview',
      runtime: 66,
    };
    const initialState: types.MoviesState = {
      movies: {
        totalAmount: 0,
        data: [movie, movie, movieExpected],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'success',
      error: null,
      showPopup: false,
      selectedMovieId: 2,
      movie: undefined,
      newPage: true,
    };
    expect(
      reducer(initialState, {
        type: types.UPDATE_SELECTED_MOVIE_ID,
        payload: 98765,
      }),
    ).toEqual({
      movies: {
        totalAmount: 0,
        data: [movie, movie, movieExpected],
        offset: 0,
        limit: 6,
      },
      dataStatus: 'success',
      error: null,
      showPopup: false,
      selectedMovieId: 98765,
      movie: movieExpected,
      newPage: false,
    });
  });
});
