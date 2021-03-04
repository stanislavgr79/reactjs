import { SELECT_GENRE, SORT_BY } from '../sidebar-reducer';

export const updateCurrentGenreAc = (payload: string) => ({ type: SELECT_GENRE, payload });
export const updateCurrentSortByAc = (payload: string) => ({ type: SORT_BY, payload });
