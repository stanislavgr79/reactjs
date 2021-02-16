import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import initialState from './initialState';

import Intro from '../../pages/Intro';
import '../../styles/main.less';

const App = () => {
  const { time, message } = initialState;

  return (
    <HashRouter>
      <Switch>
        <Route
          exact
          key="Intro"
          path="/"
          render={(props) => <Intro {...props} message={message} time={time} />}
        />
        <Redirect key="RedirectIntro" to="/" />
      </Switch>
    </HashRouter>
  );
};

export default React.memo(App);
