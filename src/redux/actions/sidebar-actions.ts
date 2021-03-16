import { SELECT_GENRE, SORT_BY } from '../reducers/sidebar-reducer';

export const updateCurrentGenre = (payload: string) => ({
  type: SELECT_GENRE,
  payload,
});
export const updateCurrentSortBy = (payload: string) => ({
  type: SORT_BY,
  payload,
});
