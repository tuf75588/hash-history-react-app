import { Component } from "react";
import { getArticle } from "../api";
import PropTypes from "prop-types";

class Article extends Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    articleId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  };
  state = {
    article: null
  };
  componentDidMount() {
    const { teamId, articleId } = this.props;
    this.fetchArticle(teamId, articleId);
  }

  componentDidUpdate(prevProps) {
    const { teamId, articleId } = this.props;

    if (articleId !== prevProps.articleId) {
      this.fetchArticle(teamId, articleId);
    }
  }

  fetchArticle = (teamId, id) => {
    this.setState(() => ({
      article: null
    }));
    getArticle(teamId, id).then((article) => {
      this.setState(() => ({
        article
      }));
    });
  };
  render() {
    return this.props.children(this.state.article);
  }
}
export default Article;
