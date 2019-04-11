import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getTeamsArticles, getArticle } from "../api";
import Article from "./Article";
import Loading from "./Loading";
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
                {(article) => {
                  return article === null ? (
                    <Loading />
                  ) : (
                    <div className='panel'>
                      <article className='article' key={article.id}>
                        <h1 className='header'>{article.title}</h1>
                        <p>{article.body}</p>
                      </article>
                    </div>
                  );
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
