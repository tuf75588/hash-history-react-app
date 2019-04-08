import React, { Component } from "react";
import Home from "./Home";
import Players from "./Players";
import Teams from "./Teams";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./Navbar";
class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Route path='/' exact component={Home} />
        <Route path='/players' component={Players} />
        <Route path='/teams' component={Teams} />
      </Router>
    );
  }
}

export default App;
