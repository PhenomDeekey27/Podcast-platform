import React from 'react'
import "./Style.css"
import { Link, NavLink, useLocation } from 'react-router-dom'

function Header() {
  const location=useLocation();
  const currentpath=location.pathname;
  const links=document.querySelectorAll("#links");
  
  links.forEach((link)=>
  {
    link.addEventListener("click",()=>
    {
      link.style.color="white";
      console.log("clicked")
    })
  })
 
  return (
    <nav>
      <div className="gradient"></div>
      <div id="links">
        <NavLink to="/">Signup</NavLink>
        <NavLink to="/podcasts">Podcasts</NavLink>
        <NavLink to="/create-a-podcast">Create a Podcast</NavLink>
        <NavLink to="/profile">Profile</NavLink>

      </div>
    </nav>
  )
}

export default Header