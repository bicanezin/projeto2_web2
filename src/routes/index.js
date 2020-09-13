import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from '../pages/SignUp';
import Home from "../pages/Home";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/signUp" component={SignUp} exact />
        <Route path="/home" component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
}
