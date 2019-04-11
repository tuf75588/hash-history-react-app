import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getTeamsArticles, getArticle } from "../api";
class Article extends React.Component {
  state = {
    articles: [],
    loading: true
  };
  componentDidMount() {
    const { params, url } = this.props.match;
    console.log(params, url);
    getTeamsArticles(params.teamId).then((articles) => {
      this.setState(() => ({
        articles,
        loading: false
      }));
    });
  }
  fetchTeamArticle = (teamId, id) => {};

  render() {
    return (
      <div className='container two-column'>
        <Sidebar
          list={this.state.articles.map((article) => article.title)}
          title='Article'
          loading={this.state.loading}
          {...this.props}
        />
        <Route
          path={this.props.match.path}
          render={({ match }) => {
            return <div className='panel' />;
          }}
        />
      </div>
    );
  }
}

export default Article;
