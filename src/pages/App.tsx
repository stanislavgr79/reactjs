import React from 'react';
import { Switch, Route, Router, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Intro from '../pages/Intro';
import './App.scss';
import NoMatch from '../pages/NoMatch';
import { Provider } from 'react-redux';
import store from '../redux/redux-store';

const history = createMemoryHistory();

const App = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <Switch>
          <Route exact key="Home" path="/" render={() => <Intro />} />
          <Route exact key="Intro" path="/movies" render={() => <Intro />} />
          <Route exact key="Movie" path="/movies/:id" render={() => <Intro />} />
          <Route exact key="404" path="/404" render={() => <NoMatch />} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
};

export default React.memo(App);
