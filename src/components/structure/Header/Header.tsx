import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddMoviePopap from '../../container/AddMoviePopap';

import Button from '../../atom/Button';
import SiteName from '../../atom/SiteName';
import Input from '../../atom/Input';
import { updateSearchValue } from '../../../redux/actions/search-actions';
import { updateShowPopup } from '../../../redux/actions/movies-actions';

import './Header.scoped.less';

const Header = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateShowPopup(showPopup));
  }, [dispatch, showPopup]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleChange = (e: any) => {
    setSearchValue(e.currentTarget.value);
  };

  const onClick = () => {
    dispatch(updateSearchValue(searchValue));
  };

  return (
    <div className="header">
      <section className="header_top">
        <SiteName />
        <Button
          onClick={() => togglePopup()}
          buttonType="button"
          className="btn_addMovie"
          label="+ ADD MOVIE"
        />
        {showPopup ? <AddMoviePopap closePopup={togglePopup} /> : null}
      </section>
      <section className="header_search">
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
  );
};

export default Header;
