import reducer from '../search-reducer';
import * as types from '../../types/search-reducer-types';

const initialState: types.SearchState = {
  search: {
    value: '',
  },
  location: '',
};

describe('search-reducer', () => {
  it('should handle UPDATE_SEARCH_QUERY', () =>
    expect(
      reducer(initialState, {
        type: types.UPDATE_SEARCH_QUERY,
        search: {
          value: 'Film',
        },
      }),
    ).toEqual({
      search: {
        value: 'Film',
      },
      location: '',
    }));

  it('should handle UPDATE_LOCATION', () =>
    expect(
      reducer(initialState, {
        type: types.UPDATE_LOCATION,
        payload: '/movies/12345',
      }),
    ).toEqual({
      search: {
        value: '',
      },
      location: '/movies/12345',
    }));
});
