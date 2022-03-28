import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router , Switch, Redirect} from 'react-router-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home/App'

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} /> {/* Home */}
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
