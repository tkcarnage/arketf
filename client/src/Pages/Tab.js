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
          <NavLink to="/arkf" activeClassName="selected">
            ARKF
          </NavLink>
        </li>
        <li>
          <NavLink to="/arkg" activeClassName="selected">
            ARKG
          </NavLink>
        </li>
        <li>
          <NavLink to="/arkk" activeClassName="selected">
            ARKK
          </NavLink>
        </li>
        <li>
          <NavLink to="/arkq" activeClassName="selected">
            ARKQ
          </NavLink>
        </li>
        <li>
          <NavLink to="/arkw" activeClassName="selected">
            ARKW
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Tab;
