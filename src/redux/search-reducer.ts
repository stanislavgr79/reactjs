export const SEARCH = 'SEARCH';

const initialState = {
  search: {
    value: '',
  },
};

const reducerSearch = (state = initialState.search, action: { type: string, payload: string }) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

export default reducerSearch;
