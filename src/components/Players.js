import React from "react";
import Sidebar from "./Sidebar";
import { Link, Route } from "react-router-dom";
import { getPlayers } from "../api";
import { parse } from "query-string";
import slug from "slug";

class Players extends React.Component {
  state = {
    playerNames: [],
    loading: true
  };
  componentDidMount() {
    const { location } = this.props;
    return location.search
      ? this.fetchPlayers(parse(location.search).teamId)
      : this.fetchPlayers();
  }
  fetchPlayers = (teamId) => {
    getPlayers(teamId).then((playerNames) => {
      this.setState(() => ({
        playerNames,
        loading: false
      }));
    });
  };
  render() {
    const { location, match } = this.props;
    console.log(location);
    return (
      <div className='container two-column'>
        <Sidebar
          list={this.state.playerNames.map((item) => item.name)}
          title='Players'
          loading={this.state.loading}
          {...this.props}
        />
        {this.state.loading === false && location.pathname === "/players" ? (
          <div className='sidebar-instruction'>Please Select A Player.</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Players;
