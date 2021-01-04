import React from 'react';
import { NavLink } from 'react-router-dom';
import './Tab.css';

function Tab(props) {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/" activeClassName="selected">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="selected">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" activeClassName="selected">
            Dashboard
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Tab;
