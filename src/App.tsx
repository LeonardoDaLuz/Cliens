import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import Login from './components/Login';
import { GlobalStyle } from "./globalStyle";
import Listagem from "./components/Listagem";
import EditarCliente from "./components/EditarCliente";
import Header from './components/Header';
import React from "react";

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
          <Switch>
            <Route path="/editar">
              <EditarCliente />
            </Route>
            <Route path="/adicionar">
              <EditarCliente />
            </Route>
            <Route path="/clientes">
              <Listagem />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}

export default withRouter(App);
