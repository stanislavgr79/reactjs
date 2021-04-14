import React from 'react';

import Header from '../../components/structure/Header';
import Footer from '../../components/structure/Footer';

import './NoMatch.scoped.scss';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/redux-store';

export default function NoMatch(): JSX.Element {
  const unknownPath = useLocation();
  const { location } = useSelector((store: AppState) => {
    return store.searchStore;
  });
  return (
    <div className="nomatch-page">
      <Header />
      <div className="nomatch-page-panel">
        <div id="nomatch-header">
          <div id="title-heading" className="pagetitle">
            <h1 id="title-text">Page Not Found</h1>
          </div>
        </div>
        <div id="sidebar-container"></div>
        <p>We can&apos;t find that page. This could be because:</p>
        <ul>
          <li>The page {location != '' ? location : unknownPath.pathname} doesn&apos;t exist.</li>
          <li>The page exists, but you don&apos;t have view permission for that space.</li>
        </ul>
        <div id="action-messages">
          <h3>Go to</h3>
          <ul>
            <li>
              <a href="/movies">Site Homepage</a>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
