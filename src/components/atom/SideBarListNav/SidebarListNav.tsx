import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedIndexListNav } from '../../../redux/actions/sidebar-actions';
import { AppState } from '../../../redux/redux-store';
import './SidebarListNav.scoped.scss';

interface IProps {
  sideGenre: { value: string, label: string }[];
  defaultValue: string;
  updateCurrentGenre: (genre: string) => void;
}

interface SideGenreProps {
  value: string;
  label: string;
}

export default function SidebarListNav({
  sideGenre,
  defaultValue,
  updateCurrentGenre,
}: IProps): JSX.Element {
  const dispatch = useDispatch();
  const store = useSelector((store: AppState) => {
    return {
      selectedIndexListNav: store.sidebar.selectedIndexListNav,
    };
  });

  const handleChange = useCallback(
    (event: any) => {
      dispatch(updateSelectedIndexListNav(event.target.id));
    },
    [dispatch],
  );

  useEffect(() => {
    sideGenre[store.selectedIndexListNav].value !== 'ALL'
      ? updateCurrentGenre(sideGenre[store.selectedIndexListNav].value.toLowerCase())
      : updateCurrentGenre('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideGenre, store.selectedIndexListNav]);

  return (
    <div className="sidebar-list-nav">
      <form
        className="side-genre-list"
        onChange={(event) => event.preventDefault()}
        defaultValue={defaultValue}
      >
        {sideGenre.map((el: SideGenreProps, index: number) => (
          <option
            className={store.selectedIndexListNav == index ? 'selected' : ''}
            id={'' + index}
            key={index}
            onClick={(e) => handleChange(e)}
          >
            {el.value}
          </option>
        ))}
      </form>
    </div>
  );
}
