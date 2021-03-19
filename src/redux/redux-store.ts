import { combineReducers, createStore, StoreEnhancer } from 'redux';
import { reducerSearch } from './reducers/search-reducer';
import { reducerMovies } from './reducers/movies-reducer';
import { reducerSideBar } from './reducers/sidebar-reducer';

const reducers = combineReducers({
  searchStore: reducerSearch,
  moviesStore: reducerMovies,
  sidebar: reducerSideBar,
});

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>,
};

const isReduxDevtoolsExtenstionExist = (arg: Window | WindowWithDevTools) => {
  return '__REDUX_DEVTOOLS_EXTENSION__' in arg;
};

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  isReduxDevtoolsExtenstionExist(window) ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined,
);

export default store;

export type AppState = ReturnType<typeof reducers>;
