import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ModelMoviePopup from '../../container/ModelMoviePopup';

import SiteName from '../../atom/SiteName';
import Button from '../../atom/Button';
import Input from '../../atom/Input';

import { Genres } from '../../../helpers/enums';
import { updateSearchValue } from '../../../redux/actions/search-actions';
import {
  updateCurrentGenre,
  updateSelectedIndexListNav,
} from '../../../redux/actions/sidebar-actions';

import './Header.scoped.less';
import { useHistory, useLocation } from 'react-router-dom';

export default function Header(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const searchParams = useLocation().search;
  const [searchValue, setSearchValue] = useState(searchParams);
  const [showPopupAdd, setShowPopupAdd] = useState(false);

  useEffect(() => {
    dispatch(updateSearchValue(searchValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchValue]);

  const togglePopup = useCallback(() => {
    setShowPopupAdd(!showPopupAdd);
  }, [showPopupAdd]);

  const handleChange = useCallback((e: any) => {
    setSearchValue(e.currentTarget.value);
  }, []);

  const onClick = useCallback(() => {
    searchValue == ''
      ? history.replace('/movies')
      : history.replace(`/movies?search=${searchValue}`);
    dispatch(updateSearchValue(searchValue));
    dispatch(updateCurrentGenre(Genres.ALL));
    dispatch(updateSelectedIndexListNav(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchValue]);

  return (
    <>
      <div className="header">
        <section className="header_top container-md">
          <SiteName />
          <Button
            onClick={() => togglePopup()}
            buttonType="button"
            className="btn_addMovie"
            label="+ ADD MOVIE"
          />
          {showPopupAdd && <ModelMoviePopup closePopup={togglePopup} role="add" />}
        </section>
        <section className="header_search container-md">
          <div className="search_title">FIND YOUR MOVIE</div>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="search_wraper">
              <Input
                name="search"
                placeholder="What do you want to watch?"
                autoComplete="off"
                value={searchValue}
                id="search"
                onChange={handleChange}
              />
              <Button buttonType="submit" onClick={onClick} className="btn_search" label="SEARCH" />
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
