export const SELECT_GENRE = 'SELECT_GENRE';
export const SORT_BY = 'SORT_BY';

const initialState = {
  genre: 'ALL',
  sortBy: 'TITLE',
};

export const reducerSideBar = (state = initialState, action: { type: string, payload: Object }) => {
  switch (action.type) {
    case SELECT_GENRE:
      return {
        ...state,
        genre: action.payload,
      };
    case SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};
