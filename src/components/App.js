import React, { Component } from "react";
import Home from "./Home";
import Players from "./Players";
import Teams from "./Teams";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/players' component={Players} />
          <Route path='/teams' component={Teams} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
