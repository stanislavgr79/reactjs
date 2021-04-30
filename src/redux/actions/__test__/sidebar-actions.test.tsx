import * as actions from '../sidebar-actions';
import * as types from '../../types/sidebar-reducer-types';
import { Genres, SortBy, SortOrder } from '../../../helpers/enums';

describe('sidebar-actions', () => {
  it('should create an action to updateCurrentGenre', () => {
    const payload = Genres.CRIME;
    const expectedAction = {
      type: types.UPDATE_SELECT_GENRE,
      payload,
    };
    expect(actions.updateCurrentGenre(payload)).toEqual(expectedAction);
  });

  it('should create an action to updateCurrentSortBy', () => {
    const payload = SortBy.TITLE;
    const expectedAction = {
      type: types.UPDATE_SORT_BY,
      payload,
    };
    expect(actions.updateCurrentSortBy(payload)).toEqual(expectedAction);
  });

  it('should create an action to updateSortOrder', () => {
    const payload = SortOrder.DESC;
    const expectedAction = {
      type: types.UPDATE_SORT_ORDER,
      payload,
    };
    expect(actions.updateSortOrder(payload)).toEqual(expectedAction);
  });

  it('should create an action to updateSelectedIndexListNav', () => {
    const payload = 5;
    const expectedAction = {
      type: types.UPDATE_SELECTED_INDEX_LIST_NAV,
      payload,
    };
    expect(actions.updateSelectedIndexListNav(payload)).toEqual(expectedAction);
  });
});
