import { SearchState, SearchActionTypes, UPDATE_SEARCH_QUERY } from '../types/search-reducer-types';

const initialState: SearchState = {
  search: {
    value: '',
  },
};

export const reducerSearch = (state = initialState, action: SearchActionTypes): SearchState => {
  switch (action.type) {
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        search: {
          value: action.search.value,
        },
      };
    default:
      return state;
  }
};
