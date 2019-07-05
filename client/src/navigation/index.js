import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/signup'>Sign Up</Link>
      </li>
      <li>
        <Link to='/signin'>Sign In</Link>
      </li>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
      <li>
        <Link to='/search'>Discover</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
