import {
  SearchActionTypes,
  UPDATE_SEARCH_QUERY,
  UPDATE_LOCATION,
} from '../types/search-reducer-types';

export const updateSearchValue = (value: string): SearchActionTypes => ({
  type: UPDATE_SEARCH_QUERY,
  search: {
    value,
  },
});

export const updateLocation = (location: string): SearchActionTypes => ({
  type: UPDATE_LOCATION,
  payload: location,
});
