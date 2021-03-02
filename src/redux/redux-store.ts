import { combineReducers, createStore } from 'redux';
import searchReducer from './search-reducer';
import moviesReducer from './movies-reducer';
import sidebarReducer from './sidebar-reducer';

const reducers = combineReducers({
  search: searchReducer,
  movies: moviesReducer,
  sidebar: sidebarReducer,
});

export const rootReducer = createStore(reducers);
