import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

import Home from "./containers/home";
import Login from "./containers/login";
import Register from "./containers/register";


class App extends Component {
  render() {
    return (
      <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route path="/" name="Home" component={Home} />
          </Switch>
      </HashRouter>
    );
  }
}

export default App;
