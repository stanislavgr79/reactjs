import {
  SearchState,
  SearchActionTypes,
  UPDATE_SEARCH_QUERY,
  UPDATE_LOCATION,
} from '../types/search-reducer-types';

const initialState: SearchState = {
  search: {
    value: '',
  },
  location: '',
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
    case UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};

export default reducerSearch;
