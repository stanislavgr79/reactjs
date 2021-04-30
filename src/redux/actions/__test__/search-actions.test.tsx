import * as actions from '../search-actions';
import * as types from '../../types/search-reducer-types';

describe('search-actions', () => {
  it('should create an action to updateSearchValue', () => {
    const value = 'Movie';
    const expectedAction = {
      type: types.UPDATE_SEARCH_QUERY,
      search: {
        value,
      },
    };
    expect(actions.updateSearchValue(value)).toEqual(expectedAction);
  });

  it('should create an action to updateLocation', () => {
    const payload = '/movie/123456';
    const expectedAction = {
      type: types.UPDATE_LOCATION,
      payload,
    };
    expect(actions.updateLocation(payload)).toEqual(expectedAction);
  });
});
