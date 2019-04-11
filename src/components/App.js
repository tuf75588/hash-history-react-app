import React, { Component } from "react";
import Home from "./Home";
import Players from "./Players";
import Teams from "./Teams";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import TeamPage from "./TeamPage";
import Articles from "./Articles";
class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/players' component={Players} />
          <Route path='/teams' component={Teams} />
          <Route path='/:teamId' exact component={TeamPage} />
          <Route path='/:teamId/articles' component={Articles} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
