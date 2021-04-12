export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export interface SearchState {
  search: {
    value: string,
  };
  location: string;
}

interface UpdateSearchQuery {
  type: typeof UPDATE_SEARCH_QUERY;
  search: {
    value: string,
  };
}

interface UpdateLocation {
  type: typeof UPDATE_LOCATION;
  payload: string;
}

export type SearchActionTypes = UpdateSearchQuery | UpdateLocation;
