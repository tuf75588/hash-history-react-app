import React, { useEffect, useState } from "react";
import TeamLogo from "./TeamLogo";
import { Link } from "react-router-dom";
import { getTeamsArticles } from "../api";
import Team from "./Team";

class TeamPage extends React.Component {
  state = {
    articles: [],
    loading: true
  };
  componentDidMount() {
    getTeamsArticles(this.props.match.params.teamId).then((articles) => {
      this.setState(() => ({
        articles,
        loading: false
      }));
    });
  }
  render() {
    const { loading, articles } = this.state;
    const { match } = this.props;
    const { teamId } = match.params;
    return (
      <div>
        <Team id={teamId}>
          {(team) =>
            team === null ? (
              <h1>Loading...</h1>
            ) : (
              <div className='panel'>
                <TeamLogo id={team.id} />
                <h1 className='medium-header'>{team.name}</h1>
              </div>
            )
          }
        </Team>
      </div>
    );
  }
}
export default TeamPage;
