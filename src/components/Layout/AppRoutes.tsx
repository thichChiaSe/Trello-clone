import TodoCard from 'features/todo/components/TodoCard';
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
      <Route path="/todo-detail">
        <TodoCard />
      </Route>
    </Switch>
  );
}
