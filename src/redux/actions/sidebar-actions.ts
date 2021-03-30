import {
  SidebarActionTypes,
  UPDATE_SELECT_GENRE,
  UPDATE_SORT_BY,
  UPDATE_SORT_ORDER,
  UPDATE_SELECTED_INDEX_LIST_NAV,
} from '../types/sidebar-reducer-types';
import { Genres, SortBy, SortOrder } from '../../helpers/enums';

export const updateCurrentGenre = (genre: Genres): SidebarActionTypes => ({
  type: UPDATE_SELECT_GENRE,
  payload: genre,
});

export const updateCurrentSortBy = (sortBy: SortBy): SidebarActionTypes => ({
  type: UPDATE_SORT_BY,
  payload: sortBy,
});

export const updateSortOrder = (sortOrder: SortOrder): SidebarActionTypes => ({
  type: UPDATE_SORT_ORDER,
  payload: sortOrder,
});

export const updateSelectedIndexListNav = (selectedIndexListNav: number): SidebarActionTypes => ({
  type: UPDATE_SELECTED_INDEX_LIST_NAV,
  payload: selectedIndexListNav,
});
