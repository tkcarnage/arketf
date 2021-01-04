import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Pages/Home';
import Etf from './Pages/Etf';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path={['/arkf', '/afkg', '/arkk', '/arkq', '/arkw']}
            component={Etf}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
