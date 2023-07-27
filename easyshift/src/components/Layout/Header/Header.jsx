import React, { useState } from 'react'
import Nav from './Nav/Nav'
import { Link } from 'react-router-dom'


const Header = () => {
  const [menuToggle,setMenuToggle] = useState(false)
  

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__container__left'>
          <div className='brand-logo btn'>
            <Link to={"/home"} className='container__flex--center' >
              <img src="/Brand_Logo.png" alt="Easyshift - an easy way to change your day" />
            </Link>
          </div>
            <Nav />
        </div>
        <div className={`menu-btn ${menuToggle ? "menu-btn--active" : ""} btn`} onClick={()=>setMenuToggle(!menuToggle)}>
          <span className='menu-btn__line'></span>
          <span className='menu-btn__line'></span>
          <span className='menu-btn__line'></span>
        </div>
      </div>
    </header>
  )
}

export default Header
