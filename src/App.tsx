import * as React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import SortedData from './pages/SortedData';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SortedData />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
