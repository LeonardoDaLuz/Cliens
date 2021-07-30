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
      {/*user.loginStatus === 'NOT_LOGGED' &&
        <Login /> ||*/
        <Switch>
          <Route path="/">
            <Header />
            <Switch>

              <Route path="/edit/:cpf">
                <EditarCliente />
              </Route>
              <Route path="/edit/">
                <EditarCliente />
              </Route>
              <Route path="/customers">
                <Listagem />
              </Route>
            </Switch>
          </Route>
        </Switch>
      }

    </Router>
  );
}

export default withRouter(App);
