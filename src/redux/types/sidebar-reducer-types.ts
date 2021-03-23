export const UPDATE_SELECT_GENRE = 'UPDATE_SELECT_GENRE';
export const UPDATE_SORT_BY = 'UPDATE_SORT_BY';
export const UPDATE_SORT_ORDER = 'UPDATE_SORT_ORDER';
export const UPDATE_SELECTED_INDEX_LIST_NAV = 'UPDATE_SELECTED_INDEX_LIST_NAV';

export interface SidebarState {
  genre: string;
  sortBy: string;
  sortOrder: string;
  selectedIndexListNav: number;
}

interface UpdateCurrentGenre {
  type: typeof UPDATE_SELECT_GENRE;
  payload: string;
}

interface UpdateCurrentSortBy {
  type: typeof UPDATE_SORT_BY;
  payload: string;
}

interface UpdateSortOrder {
  type: typeof UPDATE_SORT_ORDER;
  payload: string;
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
