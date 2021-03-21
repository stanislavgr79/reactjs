import {
  SidebarState,
  SidebarActionTypes,
  UPDATE_SELECT_GENRE,
  UPDATE_SORT_BY,
} from '../types/sidebar-reducer-types';

const initialState: SidebarState = {
  genre: 'ALL',
  sortBy: 'TITLE',
};

export const reducerSideBar = (state = initialState, action: SidebarActionTypes): SidebarState => {
  switch (action.type) {
    case UPDATE_SELECT_GENRE:
      return {
        ...state,
        genre: action.payload,
      };
    case UPDATE_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};
