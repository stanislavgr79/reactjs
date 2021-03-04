import React from 'react';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import Button from '../../atom/Button';
import SiteName from '../../atom/SiteName';
import Input from '../../atom/Input';
import * as actions from '../../../redux/actions/search-actions';

import './Header.scoped.less';

interface Props {
  classNameBtnAdd: string;
  classNameBtnSearch: string;
  btnAddLabel: string;
  btnSearchLabel: string;
  searchTitle: string;
  search?: string;
}

const defaultProps: Props = {
  classNameBtnAdd: 'btn_addMovie',
  classNameBtnSearch: 'btn_search',
  btnAddLabel: '+ ADD MOVIE',
  btnSearchLabel: 'SEARCH',
  searchTitle: 'FIND YOUR MOVIE',
};

const Header = (props: { updateSearchValue: ((e: unknown) => void) | undefined }): JSX.Element => {
  return (
    <div className="header">
      <section className="header_top">
        <SiteName />
        <Button
          buttonType="submit"
          className={defaultProps.classNameBtnAdd}
          label={defaultProps.btnAddLabel}
        />
      </section>
      <section className="header_search">
        <div className="search_title">{defaultProps.searchTitle}</div>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="search_wraper">
            <Input
              name="search"
              placeholder="What do you want to watch?"
              autoComplete="off"
              id="search"
            />
            <Button
              buttonType="submit"
              onClick={props.updateSearchValue}
              className={defaultProps.classNameBtnSearch}
              label={defaultProps.btnSearchLabel}
            />
          </div>
        </form>
      </section>
    </div>
  );
};

const mapStateToProps = (store: { search: string }) => ({
  search: store.search,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  const { updateSearchValueAc } = bindActionCreators(actions, dispatch);

  return {
    updateSearchValue: () => {
      const newValue = document.querySelector('#search').value;
      updateSearchValueAc(newValue);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
