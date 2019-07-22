import React from "react";
import Sidebar from "./Sidebar";
import { Link, Route } from "react-router-dom";
import { getPlayers } from "../api";

import { parse } from "query-string";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import slug from "slug";

class Players extends React.Component {
  state = {
    playerNames: [],
    loading: true
  };
  componentDidMount() {
    const { location } = this.props;
    return location.search
      ? this.fetchPlayers(parse(location.search).teamId)
      : this.fetchPlayers();
  }

  fetchPlayers = (teamId) => {
    getPlayers(teamId).then((playerNames) => {
      this.setState(() => ({
        playerNames,
        loading: false
      }));
    });
  };
  render() {
    const { location, match } = this.props;

    return (
      <div className="container two-column">
        <Sidebar
          list={this.state.playerNames.map((item) => item.name)}
          title="Players"
          loading={this.state.loading}
          {...this.props}
        />
        {this.state.loading === false && location.pathname === "/players" ? (
          <div className="sidebar-instruction">Please Select A Player.</div>
        ) : null}
        <Route
          path={`${match.url}/:player`}
          render={({ match }) => {
            if (this.state.loading === true) return null;
            const {
              name,
              position,
              teamId,
              number,
              avatar,
              rpg,
              spg,
              apg,
              ppg
            } = this.state.playerNames.find(
              (player) => slug(player.name) === match.params.player
            );
            return (
              <TransitionGroup className="panel">
                <CSSTransition
                  key={location.key}
                  timeout={250}
                  classNames="fade"
                >
                  <div className="panel">
                    <img
                      src={avatar}
                      alt={`avatar for ${name}`}
                      className="avatar"
                    />
                    <h1 className="medium-header">{name}</h1>
                    <h2 className="header">{number}</h2>
                    <div className="row">
                      <ul className="info-list" style={{ marginRight: 80 }}>
                        <li>
                          Team
                          <div>
                            <Link
                              to={`/${teamId}`}
                              style={{ color: "#68809a" }}
                            >
                              {teamId[0].toUpperCase() + teamId.slice(1)}
                            </Link>
                          </div>
                        </li>
                        <li>
                          Position<div>{position}</div>
                        </li>
                        <li>
                          PPG<div>{ppg}</div>
                        </li>
                      </ul>
                      <ul className="info-list">
                        <li>
                          APG<div>{apg}</div>
                        </li>
                        <li>
                          SPG<div>{spg}</div>
                        </li>
                        <li>
                          RBG<div>{rpg}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      </div>
    );
  }
}
export default Players;
