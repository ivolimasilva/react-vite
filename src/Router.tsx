import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import Winners from './Winners';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/:year">
        <Winners />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
