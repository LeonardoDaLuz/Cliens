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
import { useSelector } from "react-redux";
import { RootState } from "./store";


function App() {

  const user = useSelector((state: RootState) => state.user);

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Header />
          <Switch>
            <Route exact path="/">
              <Listagem />
            </Route>
            <Route path="/customers">
              <Listagem />
            </Route>
            <Route path="/edit/:id">
              <EditarCliente key={1} />
            </Route>
            <Route path="/add/">
              <EditarCliente key={2} />
            </Route>

          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}

export default withRouter(App);
