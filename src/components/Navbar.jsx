import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css';


const Navbar = () => {
  return (
    <div className='nav-container'>
      <NavLink to="/" className='link'>
        Home
      </NavLink>
      
      <NavLink to="/snips" className='link'>
        Snips
      </NavLink>
    </div>
  )
}

export default Navbar
