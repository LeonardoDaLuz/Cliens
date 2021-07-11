import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import { Topbar } from "./components/TopBar";
import Login from './components/Login';
import { GlobalStyle } from "./globalStyle";
import colorTheme from './colorTheme';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Topbar />
        </Route>
      </Switch>
    </Router>
  );
}

export default withRouter(App);
