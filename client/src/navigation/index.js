import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <div className='navigation'>
    <ul className='nav-bar'>
    <img className='logo' src='pica.png' alt='logo' />
      <li className='nav-link'>
        <Link to='/'>Home</Link>
      </li>
      <li className='nav-link'>
        <Link to='/signup'>Sign Up</Link>
      </li>
      <li className='nav-link'>
        <Link to='/signin'>Sign In</Link>
      </li>
      <li className='nav-link'>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li className='nav-link'>
        <Link to='/profile'>Profile</Link>
      </li>
      <li className='nav-link'>
        <Link to='/search'>Discover</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
