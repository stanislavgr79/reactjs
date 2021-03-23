import {
  SidebarState,
  SidebarActionTypes,
  UPDATE_SELECT_GENRE,
  UPDATE_SORT_BY,
  UPDATE_SORT_ORDER,
  UPDATE_SELECTED_INDEX_LIST_NAV,
} from '../types/sidebar-reducer-types';

const initialState: SidebarState = {
  genre: '',
  sortBy: 'title',
  sortOrder: 'asc',
  selectedIndexListNav: 0,
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
    case UPDATE_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };
    case UPDATE_SELECTED_INDEX_LIST_NAV:
      return {
        ...state,
        selectedIndexListNav: action.payload,
      };
    default:
      return state;
  }
};
