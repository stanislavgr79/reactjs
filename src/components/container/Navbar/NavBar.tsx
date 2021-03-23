import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/redux-store';
import {
  updateCurrentGenre,
  updateCurrentSortBy,
  updateSortOrder,
} from '../../../redux/actions/sidebar-actions';

import SidebarListNav from '../../../components/atom/SideBarListNav';
import SidebarSelectNav from '../../../components/atom/SidebarSelectNav';
import Button from '../../atom/Button';

import './NavBar.scoped.scss';
import initialState from '../../../resources/sidebar.json';

export default function NavBar(): JSX.Element {
  const dispatch = useDispatch();
  const store = useSelector((store: AppState) => {
    return {
      movies: store.moviesStore.movies,
      sidebar: store.sidebar,
    };
  });
  const [sortOrder, setSortOrder] = useState(store.sidebar.sortOrder);
  const sideGenre: { value: string, label: string }[] = initialState.genre;
  const sideSortBy: { value: string, label: string }[] = initialState.sort;

  useEffect(() => {
    dispatch(updateSortOrder(sortOrder));
  }, [dispatch, sortOrder]);

  const handleChangeGenre = useCallback(
    (event: string) => {
      dispatch(updateCurrentGenre(event));
    },
    [dispatch],
  );

  const handleChangeSortBy = useCallback(
    (sortBy: string) => {
      dispatch(updateCurrentSortBy(sortBy));
    },
    [dispatch],
  );

  const changeSortOrder = () => {
    sortOrder == 'asc' ? setSortOrder('desc') : setSortOrder('asc');
  };

  return (
    <div className="nav-bar container-md">
      <div className="side-genre">
        <SidebarListNav
          sideGenre={sideGenre}
          defaultValue={store.sidebar.genre}
          updateCurrentGenre={(genre: string) => handleChangeGenre(genre)}
        />
      </div>
      <div className="side-sort ">
        <label>SORT BY</label>
        <SidebarSelectNav
          sideSortBy={sideSortBy}
          defaultValue={store.sidebar.sortBy}
          updateCurrentSortBy={(sortBy: string) => handleChangeSortBy(sortBy)}
        />
        <div className="sort_order">
          <Button
            buttonType="button"
            className={`btn_arrow ${sortOrder == 'asc' ? `arrow_down` : `arrow_up`}`}
            onClick={changeSortOrder}
            title="Change sort order"
          />
        </div>
      </div>
    </div>
  );
}
