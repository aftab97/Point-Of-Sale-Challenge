/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cashier from "./components/Cashier/Cashier";
import Statistics from "./components/Statistics/Statistics";
import AddItems from "./components/AddItems/AddItems";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Cashier />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route path="/add-items">
            <AddItems />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
