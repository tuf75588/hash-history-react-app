import React from "react";
import { Link, Route } from "react-router-dom";
import slug from "slug";
import PropTypes from "prop-types";

Sidebar.propTypes = {
  // title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

function CustomLink({ to, children }) {
  return (
    <Route
      to={to.pathname}
      children={({ match }) => (
        <li
          style={{
            listStyleType: "none",
            fontWeight: match ? "bold" : "normal"
          }}
        >
          <Link to={to}>{children}</Link>
        </li>
      )}
    />
  );
}

function Sidebar({ title, list, loading, match, location }) {
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <h3 className='header'>{title}</h3>
      <ul className='sidebar-list'>
        {list.map((item, index) => (
          <CustomLink
            to={{
              pathname: `${match.url}/${slug(item)}`,
              search: location.search
            }}
            key={index}
          >
            {item.toUpperCase()}
          </CustomLink>
        ))}
      </ul>
    </div>
  );
}
export default Sidebar;
