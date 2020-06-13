import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import OHNavbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Meets from "./components/pages/meets/Meets";
import Business from "./components/pages/business/Business";
import Teachers from "./components/pages/teachers/Teachers";

function App() {
  return (
    <div className="App">
      <OHNavbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Meets />
          </Route>
          <Route exact path="/business">
            <Business />
          </Route>
          <Route exact path="/teachers">
            <Teachers />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
