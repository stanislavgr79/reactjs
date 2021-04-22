import { Genres, SortBy, SortOrder } from '../../helpers/enums';

/* eslint-disable no-unused-vars */
export const UPDATE_SELECT_GENRE = 'UPDATE_SELECT_GENRE';
export const UPDATE_SORT_BY = 'UPDATE_SORT_BY';
export const UPDATE_SORT_ORDER = 'UPDATE_SORT_ORDER';
export const UPDATE_SELECTED_INDEX_LIST_NAV = 'UPDATE_SELECTED_INDEX_LIST_NAV';

export interface SidebarState {
  genre: Genres;
  sortBy: SortBy;
  sortOrder: SortOrder;
  selectedIndexListNav?: number;
}

interface UpdateCurrentGenre {
  type: typeof UPDATE_SELECT_GENRE;
  payload: Genres;
}

interface UpdateCurrentSortBy {
  type: typeof UPDATE_SORT_BY;
  payload: SortBy;
}

interface UpdateSortOrder {
  type: typeof UPDATE_SORT_ORDER;
  payload: SortOrder;
}

interface UpdateSelectedIndexListNav {
  type: typeof UPDATE_SELECTED_INDEX_LIST_NAV;
  payload: number;
}

export type SidebarActionTypes =
  | UpdateCurrentGenre
  | UpdateCurrentSortBy
  | UpdateSortOrder
  | UpdateSelectedIndexListNav;
