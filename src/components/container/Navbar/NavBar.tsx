import React from 'react';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import SidebarSelectNav from '../../atom/SidebarSelectNav';
import SidebarListNav from '../../atom/SideBarListNav';
import * as actions from '../../../redux/actions/sidebar-actions';

import './NavBar.scoped.scss';

const initialState = require('../../../resources/sidebar.json');

const sideGenre: [] = initialState.genre;
const sideSortBy: [] = initialState.sort;

const NavBar = (props: {
  updateCurrentGenre: (e: string) => void,
  updateCurrentSortBy: (e: string) => void,
  genre: string,
  sort: string,
  sideGenre: [],
  sideSortBy: [],
}): JSX.Element => {
  return (
    <div className="nav-bar">
      <div className="side-genre">
        <SidebarListNav
          sideGenre={props.sideGenre}
          genre={props.genre}
          updateCurrentGenre={props.updateCurrentGenre}
        />
      </div>
      <div className="side-sort ">
        <label>SORT BY</label>
        <SidebarSelectNav
          sideSortBy={props.sideSortBy}
          sort={props.sort}
          updateCurrentSortBy={props.updateCurrentSortBy}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (store: { sidebar: { genre: string, sort: string } }) => ({
  genre: store.sidebar.genre,
  sort: store.sidebar.sort,
  sideGenre,
  sideSortBy,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  const { updateCurrentGenreAc, updateCurrentSortByAc } = bindActionCreators(actions, dispatch);

  return {
    updateCurrentGenre: (genre: string) => {
      updateCurrentGenreAc(genre);
    },
    updateCurrentSortBy: (sort: string) => {
      updateCurrentSortByAc(sort);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
