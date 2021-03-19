export const UPDATE_SELECT_GENRE = 'UPDATE_SELECT_GENRE';
export const UPDATE_SORT_BY = 'UPDATE_SORT_BY';

export interface SidebarState {
  genre: string;
  sortBy: string;
}

interface UpdateCurrentGenre {
  type: typeof UPDATE_SELECT_GENRE;
  payload: string;
}

interface UpdateCurrentSortBy {
  type: typeof UPDATE_SORT_BY;
  payload: string;
}

export type SidebarActionTypes = UpdateCurrentGenre | UpdateCurrentSortBy;
