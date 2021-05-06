import reducer from '../sidebar-reducer';
import * as types from '../../types/sidebar-reducer-types';
import { Genres, SortBy, SortOrder } from '../../../helpers/enums';

const initialState: types.SidebarState = {
  genre: Genres.ALL,
  sortBy: SortBy.TITLE,
  sortOrder: SortOrder.ASC,
  selectedIndexListNav: 0,
};

describe('todos reducer', () => {
  it('should handle UPDATE_SELECT_GENRE', () =>
    expect(
      reducer(initialState, {
        type: types.UPDATE_SELECT_GENRE,
        payload: Genres.DOCUMENTARY,
      }),
    ).toEqual({
      genre: Genres.DOCUMENTARY,
      sortBy: SortBy.TITLE,
      sortOrder: SortOrder.ASC,
      selectedIndexListNav: 0,
    }));

  it('should handle UPDATE_SORT_BY', () =>
    expect(
      reducer(initialState, {
        type: types.UPDATE_SORT_BY,
        payload: SortBy.RATING,
      }),
    ).toEqual({
      genre: Genres.ALL,
      sortBy: SortBy.RATING,
      sortOrder: SortOrder.ASC,
      selectedIndexListNav: 0,
    }));

  it('should handle UPDATE_SORT_ORDER', () =>
    expect(
      reducer(initialState, {
        type: types.UPDATE_SORT_ORDER,
        payload: SortOrder.DESC,
      }),
    ).toEqual({
      genre: Genres.ALL,
      sortBy: SortBy.TITLE,
      sortOrder: SortOrder.DESC,
      selectedIndexListNav: 0,
    }));

  it('should handle UPDATE_SELECTED_INDEX_LIST_NAV', () =>
    expect(
      reducer(initialState, {
        type: types.UPDATE_SELECTED_INDEX_LIST_NAV,
        payload: 5,
      }),
    ).toEqual({
      genre: Genres.ALL,
      sortBy: SortBy.TITLE,
      sortOrder: SortOrder.ASC,
      selectedIndexListNav: 5,
    }));
});
