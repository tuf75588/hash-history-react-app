import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTeamNames } from "../api";
import TeamLogo from "./TeamLogo";
class Home extends React.Component {
  state = {
    teamNames: []
  };
  componentDidMount() {
    getTeamNames().then((teams) => {
      this.setState((state, props) => {
        return {
          teamNames: teams
        };
      });
    });
  }

  render() {
    const { teamNames } = this.state;
    console.log(this.props);
    return (
      <div className='container'>
        <h1 className='large-header'>Hash History Basketball League</h1>
        <h3 className='header text-center'>Select a team</h3>
        <div className='home-grid'>
          {teamNames.map((id) => (
            <Link to={`/${id}`} key={id}>
              <TeamLogo id={id} width='125px' />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
export default Home;
