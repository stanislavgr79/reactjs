import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ModelMoviePopup from '../../container/ModelMoviePopup';

import SiteName from '../../atom/SiteName';
import Button from '../../atom/Button';
import Input from '../../atom/Input';

import { updateSearchValue } from '../../../redux/actions/search-actions';
import { updateShowPopup } from '../../../redux/actions/movies-actions';

import './Header.scoped.less';

export default function Header(): JSX.Element {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(updateShowPopup(showPopup));
  }, [dispatch, showPopup]);

  const togglePopup = useCallback(() => {
    setShowPopup(!showPopup);
  }, [showPopup]);

  const handleChange = useCallback((e: any) => {
    setSearchValue(e.currentTarget.value);
  }, []);

  const onClick = useCallback(() => {
    dispatch(updateSearchValue(searchValue));
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
          {showPopup && <ModelMoviePopup closePopup={togglePopup} role="add" />}
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
