import {
  SidebarActionTypes,
  UPDATE_SELECT_GENRE,
  UPDATE_SORT_BY,
} from '../types/sidebar-reducer-types';

export const updateCurrentGenre = (genre: string): SidebarActionTypes => ({
  type: UPDATE_SELECT_GENRE,
  payload: genre,
});
export const updateCurrentSortBy = (sortBy: string): SidebarActionTypes => ({
  type: UPDATE_SORT_BY,
  payload: sortBy,
});
