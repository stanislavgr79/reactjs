import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/redux-store';

import SidebarListNav from '../../../components/atom/SideBarListNav';
import SidebarSelectNav from '../../../components/atom/SidebarSelectNav';
import Button from '../../atom/Button';

import { Genres, SortBy, SortOrder } from '../../../helpers/enums';
import {
  updateCurrentGenre,
  updateCurrentSortBy,
  updateSortOrder,
} from '../../../redux/actions/sidebar-actions';

import './NavBar.scoped.scss';

export default function NavBar(): JSX.Element {
  const dispatch = useDispatch();
  const { genre, sortBy, sortOrder } = useSelector((store: AppState) => {
    return store.sidebar;
  });
  const [sortOrderState, setSortOrderState] = useState(sortOrder);

  useEffect(() => {
    dispatch(updateSortOrder(sortOrderState));
  }, [dispatch, sortOrderState]);

  const handleChangeGenre = useCallback(
    (genre: Genres) => {
      dispatch(updateCurrentGenre(genre));
    },
    [dispatch],
  );

  const handleChangeSortBy = useCallback(
    (sortBy: SortBy) => {
      dispatch(updateCurrentSortBy(sortBy));
    },
    [dispatch],
  );

  const changeSortOrder = () => {
    sortOrderState == SortOrder.ASC
      ? setSortOrderState(SortOrder.DESC)
      : setSortOrderState(SortOrder.ASC);
  };

  return (
    <div className="nav-bar container-md">
      <div className="side-genre">
        <SidebarListNav
          defaultValue={genre}
          updateCurrentGenre={(genre: Genres) => handleChangeGenre(genre)}
        />
      </div>
      <div className="side-sort ">
        <label>SORT BY</label>
        <SidebarSelectNav
          defaultValue={sortBy}
          updateCurrentSortBy={(sortBy: SortBy) => handleChangeSortBy(sortBy)}
        />
        <div className="sort_order">
          <Button
            buttonType="button"
            className={`btn_arrow ${sortOrderState == SortOrder.ASC ? `arrow_down` : `arrow_up`}`}
            onClick={changeSortOrder}
            title="Change sort order"
          />
        </div>
      </div>
    </div>
  );
}
