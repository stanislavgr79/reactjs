import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/redux-store';
import { updateCurrentGenre, updateCurrentSortBy } from '@redux/actions/sidebar-actions';

import SidebarListNav from '@components/atom/SideBarListNav';
import SidebarSelectNav from '@components/atom/SidebarSelectNav';

import './NavBar.scoped.scss';
import initialState from '@resources/sidebar.json';

export default function NavBar(): JSX.Element {
  const dispatch = useDispatch();
  const store = useSelector((store: AppState) => {
    return {
      sidebar: store.sidebar,
    };
  });

  const sideGenre: [] = initialState.genre;
  const sideSortBy: [] = initialState.sort;

  return (
    <div className="nav-bar container-md">
      <div className="side-genre">
        <SidebarListNav
          sideGenre={sideGenre}
          defaultValue={store.sidebar.genre}
          updateCurrentGenre={(e) => dispatch(updateCurrentGenre(e))}
        />
      </div>
      <div className="side-sort ">
        <label>SORT BY</label>
        <SidebarSelectNav
          sideSortBy={sideSortBy}
          defaultValue={store.sidebar.sortBy}
          updateCurrentSortBy={(e) => dispatch(updateCurrentSortBy(e))}
        />
      </div>
    </div>
  );
}
