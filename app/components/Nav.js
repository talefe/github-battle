import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  color: 'rgb(187, 46, 31)'
};

function Nav({ theme, toggleTheme }) {
  return (
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <NavLink activeStyle={activeStyle} to='/' exact className='nav-link'>
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to='/battle' className='nav-link'>
            Battle
          </NavLink>
        </li>
      </ul>
      <button style={{ fontSize: 30 }} className='btn-clear' onClick={toggleTheme}>
        {theme === 'light' ? '🔦' : '💡'}
      </button>
    </nav>
  );
}

export default Nav;
