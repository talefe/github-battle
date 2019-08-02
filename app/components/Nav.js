var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav() {
  return (
    <ul className="flex-center">
      <li style={{ margin: 5 }}>
        <NavLink
          exact
          activeClassName="active"
          to="/"
          className="btn-clear nav-link"
        >
          Home
        </NavLink>
      </li>
      <li style={{ margin: 5 }}>
        <NavLink
          activeClassName="active"
          to="/battle"
          className="btn-clear nav-link"
        >
          Battle
        </NavLink>
      </li>
      <li style={{ margin: 5 }}>
        <NavLink
          activeClassName="active"
          to="/popular"
          className="btn-clear nav-link"
        >
          Popular
        </NavLink>
      </li>
    </ul>
  );
}

module.exports = Nav;
