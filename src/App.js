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
import Listagem from "./components/Listagem";
import Header from './components/Header';
function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Header />
        </Route>
      </Switch>
    </Router>
  );
}

export default withRouter(App);
