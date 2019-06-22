import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import '../css/navbar.css'

const Navbar = withRouter(() => (
  <div id='navbar' className='bg-purple nav-wdth'>
    <Link to='/lists'>My Lists</Link>    
    <Link to='/users'>Admin Settings</Link>
  </div>
))

export default Navbar