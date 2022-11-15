import TestPage from 'features/testTodo/pages';
import Test from 'features/todo copy/pages/TablePage';
import TablePage from 'features/todo/pages/TablePage';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
export function AppRoutes() {
  return (
    <Switch>
      <Route path="/todo">
        <TablePage />
        {/* <TodoTable /> */}
      </Route>
      <Route path="/trolle">
        <Test />
      </Route>
    </Switch>
  );
}
