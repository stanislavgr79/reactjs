import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/redux-store';

import Intro from '@pages/Intro';
import './App.scss';

const App = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <Switch>
          <Route exact key="Intro" path="/" render={() => <Intro />} />
          <Redirect key="RedirectIntro" to="/" />
        </Switch>
      </Provider>
    </HashRouter>
  );
};

export default React.memo(App);
