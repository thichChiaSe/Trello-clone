import React from 'react';
// eslint-disable-next-line import/first
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';
export default function SynonymsFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>
    </Switch>
  );
}
