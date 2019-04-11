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
    article: {
      title: "",
      body: ""
    },
    loading: true
  };
  componentDidMount() {
    this.fetchArticle(this.props.teamId, this.props.articleId);
  }
  fetchArticle = (teamId, id) => {
    this.setState(() => ({
      article: null
    }));
    getArticle(teamId, id).then((article) => {
      console.log(article, "ARTICLE");
    });
  };
  render() {
    return "hi!";
  }
}
export default Article;
