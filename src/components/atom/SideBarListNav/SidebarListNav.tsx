import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Genres } from '../../../helpers/enums';
import { updateSelectedIndexListNav } from '../../../redux/actions/sidebar-actions';
import { AppState } from '../../../redux/redux-store';

import './SidebarListNav.scoped.scss';

interface IProps {
  defaultValue: Genres;
  updateCurrentGenre: (genre: Genres) => void;
}

export default function SidebarListNav({ defaultValue, updateCurrentGenre }: IProps): JSX.Element {
  const dispatch = useDispatch();
  const { selectedIndexListNav } = useSelector((store: AppState) => {
    return store.sidebar;
  });
  const sideGenre = Object.values(Genres);

  const handleChange = useCallback(
    (index: number) => {
      dispatch(updateSelectedIndexListNav(index));
    },
    [dispatch],
  );

  useEffect(() => {
    sideGenre[selectedIndexListNav] !== Genres.ALL
      ? updateCurrentGenre(sideGenre[selectedIndexListNav])
      : updateCurrentGenre(Genres.ALL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndexListNav]);

  return (
    <div className="sidebar-list-nav">
      <form
        className="side-genre-list"
        onChange={(event) => event.preventDefault()}
        defaultValue={defaultValue}
      >
        {Object.entries(Genres).map(([key, value], index: number) => (
          <option
            className={selectedIndexListNav == index ? 'selected' : ''}
            id={`${value}-${index}`}
            value={value}
            key={`sidebar-genres-${index}`}
            onClick={() => handleChange(index)}
          >
            {key}
          </option>
        ))}
      </form>
    </div>
  );
}
