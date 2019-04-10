import React, { Component } from "react";
import { getTeamNames } from "../api";
import Sidebar from "./Sidebar";
import { Route, Link } from "react-router-dom";
import TeamLogo from "./TeamLogo";
import Team from "./Team";
import TeamPage from "./TeamPage";
class Teams extends React.Component {
  state = {
    teams: [],
    loading: true
  };
  componentDidMount() {
    getTeamNames().then((teams) => {
      this.setState(() => ({
        teams,
        loading: false
      }));
    });
  }
  render() {
    return (
      <div className='container two-column'>
        <Sidebar
          list={this.state.teams}
          loading={this.state.loading}
          title='Teams'
          {...this.props}
        />

        {this.state.loading === false &&
        this.props.location.pathname === "/teams" ? (
          <div className='sidebar-instruction'>Please select a team</div>
        ) : null}
        <Route
          path={`${this.props.match.url}/:teamId`}
          render={({ match }) => {
            console.log(match);
            return (
              <div className='panel'>
                <Team id={match.params.teamId}>
                  {(team) =>
                    team === null ? (
                      <h1>Loading...</h1>
                    ) : (
                      <div style={{ width: "100%" }}>
                        <TeamLogo id={team.id} className='center' />
                        <h1 className='medium-header'>{team.name}</h1>
                        <ul className='info-list row'>
                          <li>
                            Established
                            <div>{team.established}</div>
                          </li>
                          <li>
                            Manager
                            <div>{team.manager}</div>
                          </li>
                          <li>
                            Coach
                            <div>{team.coach}</div>
                          </li>
                        </ul>
                        <Link
                          className='btn-main center'
                          to={`/${match.params.teamId}`}
                        >
                          {team.name} Team Page
                        </Link>
                      </div>
                    )
                  }
                </Team>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
export default Teams;
