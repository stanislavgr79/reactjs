export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';

export interface SearchState {
  search: {
    value: string,
  };
}

interface UpdateSearchQuery {
  type: typeof UPDATE_SEARCH_QUERY;
  search: {
    value: string,
  };
}

export type SearchActionTypes = UpdateSearchQuery;
