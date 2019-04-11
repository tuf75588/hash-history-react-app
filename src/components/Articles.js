import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getTeamsArticles, getArticle } from "../api";
import Article from "./Article";
class Articles extends React.Component {
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

  render() {
    const { match, url } = this.props;
    console.log(match);
    return (
      <div className='container two-column'>
        <Sidebar
          list={this.state.articles.map((article) => article.title)}
          title='Article'
          loading={this.state.loading}
          {...this.props}
        />
        <Route
          path={`${this.props.match.url}/:articleId`}
          render={({ match }) => {
            return (
              <Article
                articleId={match.params.articleId}
                teamId={this.props.match.params.teamId}
              >
                {({ article }) => {
                  console.log(article);
                }}
              </Article>
            );
          }}
        />
      </div>
    );
  }
}

export default Articles;
