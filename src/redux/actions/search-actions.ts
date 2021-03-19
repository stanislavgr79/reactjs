import { SEARCH } from '../reducers/search-reducer';

export const updateSearchValue = (payload: string) => ({
  type: SEARCH,
  payload,
});
