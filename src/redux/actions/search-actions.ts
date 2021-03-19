import { SearchActionTypes, UPDATE_SEARCH_QUERY } from '../types/search-reducer-types';

export const updateSearchValue = (value: string): SearchActionTypes => ({
  type: UPDATE_SEARCH_QUERY,
  search: {
    value,
  },
});
