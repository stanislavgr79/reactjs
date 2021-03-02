import { SEARCH } from '../search-reducer';

export const updateSearchValueAc = (payload: string) => ({ type: SEARCH, payload });
