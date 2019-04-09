import { Component } from "react";
import PropTypes from "prop-types";
import { getTeam } from "../api";
import { withRouter } from "react-router-dom";
class Team extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  };
  state = {
    team: null
  };
  componentDidMount() {
    this.fetchTeam(this.props.id);
  }
  componentWillUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.fetchTeam(prevProps.id);
    }
  }
  fetchTeam = (id) => {
    this.setState(() => ({
      team: null
    }));
    getTeam(id).then((team) => {
      this.setState(() => ({
        team
      }));
    });
  };
  render() {
    return this.props.children(this.state.team);
  }
}
export default Team;
