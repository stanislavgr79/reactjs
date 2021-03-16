import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarListNav from '../../atom/SideBarListNav';
import SidebarSelectNav from '../../atom/SidebarSelectNav';

import { updateCurrentGenre, updateCurrentSortBy } from '../../../redux/actions/sidebar-actions';
import './NavBar.scoped.scss';
const initialState = require('../../../resources/sidebar.json');

const NavBar = (): JSX.Element => {
  const sidebar = useSelector(
    (store: { sidebar: { genre: string, sortBy: string } }) => store.sidebar,
  );
  const sideGenre: [] = initialState.genre;
  const sideSortBy: [] = initialState.sort;
  const dispatch = useDispatch();

  return (
    <div className="nav-bar">
      <div className="side-genre">
        <SidebarListNav
          sideGenre={sideGenre}
          defaultValue={sidebar.genre}
          updateCurrentGenre={(e) => dispatch(updateCurrentGenre(e))}
        />
      </div>
      <div className="side-sort ">
        <label>SORT BY</label>
        <SidebarSelectNav
          sideSortBy={sideSortBy}
          defaultValue={sidebar.sortBy}
          updateCurrentSortBy={(e) => dispatch(updateCurrentSortBy(e))}
        />
      </div>
    </div>
  );
};

export default NavBar;
