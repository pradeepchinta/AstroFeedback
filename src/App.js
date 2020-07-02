import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './components/Home';
import NewFeedBack from './components/AddNewFeedBack';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './store';

const NoMatch = (props) => {
  const location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-new" exact component={NewFeedBack} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
