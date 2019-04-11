import React from "react";
import TeamLogo from "./TeamLogo";
import { Link, Redirect } from "react-router-dom";
import { getTeamsArticles, getTeamNames } from "../api";
import Team from "./Team";
import slug from "slug";
import Article from "./Article";
class TeamPage extends React.Component {
  state = {
    articles: [],
    loading: true,
    teamNames: {},
    hasError: false
  };
  componentDidMount() {
    Promise.all([
      getTeamsArticles(this.props.match.params.teamId),
      getTeamNames()
    ]).then(([articles, teamNames]) => {
      this.setState(() => ({
        articles,
        teamNames,
        loading: false,
        hasError: teamNames.includes(this.props.match.params.teamId) === false
      }));
    });
  }
  componentWillUnmount() {
    this.loading = true;
  }
  render() {
    const { articles, hasError, loading } = this.state;
    const { match } = this.props;
    const { teamId } = match.params;
    if (loading === false && hasError) {
      return <Redirect to='/' />;
    }
    console.log(match);
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
                <h4 style={{ margin: 5 }}>
                  <Link
                    style={{ cursor: "pointer" }}
                    to={{
                      pathname: `/players`,
                      search: `?teamId=${teamId}`
                    }}
                  >
                    View Roster
                  </Link>
                </h4>
                <h4>Championships</h4>
                <ul className='championships'>
                  {team.championships.map((year) => (
                    <li key={year}>{year}</li>
                  ))}
                </ul>
                <ul className='info-list row' style={{ width: "100%" }}>
                  <li>
                    Established <div>{team.established}</div>
                  </li>
                  <li>
                    Manager <div>{team.manager}</div>
                  </li>
                  <li>
                    Coach <div>{team.coach}</div>
                  </li>
                  <li>
                    Record
                    <div>
                      {team.wins}-{team.losses}
                    </div>
                  </li>
                </ul>
                <h2 className='header'>Articles</h2>
                <ul className='articles'>
                  {articles.map(({ title, id, date }) => {
                    return (
                      <li>
                        <Link
                          to={{
                            pathname: `${match.url}/articles/${slug(title)}`,
                            state: articles
                          }}
                        >
                          <h4 className='article-title'>{title}</h4>
                          <div className='article-date'>
                            {date.toLocaleDateString()}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )
          }
        </Team>
      </div>
    );
  }
}
export default TeamPage;
