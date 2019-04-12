import React, { Component } from "react";
import DynamicImport from "./DynamicImport";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Loading from "./Loading";

function Home(props) {
  return (
    <DynamicImport load={() => import("./Home")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
}
function Players(props) {
  return (
    <DynamicImport load={() => import("./Players")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
}

function Teams(props) {
  return (
    <DynamicImport load={() => import("./Teams")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
}

function TeamPage(props) {
  return (
    <DynamicImport load={() => import("./TeamPage")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
}
function Articles(props) {
  return (
    <DynamicImport load={() => import("./Articles")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
}

function NotFound(props) {
  return (
    <DynamicImport load={() => import("./NotFound")}>
      {(Component) =>
        Component === null ? <Loading /> : <Component {...props} />
      }
    </DynamicImport>
  );
}

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
