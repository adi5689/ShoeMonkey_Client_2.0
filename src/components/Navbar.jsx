import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdHomeFilled } from 'react-icons/md';
import { GiConverseShoe, GiSlippers, GiRunningShoe } from "react-icons/gi"

const Navbar = ({containerStyles, toggleMenu}) => {
  const handleClick = () => {
    if(toggleMenu){
      toggleMenu();
    }
  }
  return (
    <nav className={`${containerStyles }`}>
        <NavLink to={'/'} className={({isActive}) => isActive ? "active_link" : ""} onClick={handleClick}><div className='font-anta flexStart gap-x-1 hover:text-[#40bf80]'><MdHomeFilled className='hover:text-[#ff471a]'/> Home</div></NavLink>
        <NavLink to={'/sneakers'} className={({isActive}) => isActive ? "active_link" : ""} onClick={handleClick}><div className='font-anta flexStart gap-x-1 hover:text-[#40bf80]'><GiConverseShoe className='hover:text-[#ff471a]'/> Sneakers</div></NavLink>
        <NavLink to={'/slides'} className={({isActive}) => isActive ? "active_link" : ""} onClick={handleClick}><div className='font-anta flexStart gap-x-1 hover:text-[#40bf80]'><GiSlippers className='hover:text-[#ff471a]'/> Slides</div></NavLink>
        <NavLink to={'/sports'} className={({isActive}) => isActive ? "active_link" : ""} onClick={handleClick}><div className='font-anta flexStart gap-x-1 hover:text-[#40bf80]'><GiRunningShoe className='hover:text-[#ff471a]'/> Sports</div></NavLink>
    </nav>
  )
}

export default Navbar;