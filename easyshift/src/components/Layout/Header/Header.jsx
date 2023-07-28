import React, { useState } from 'react'
import Nav from './Nav/Nav'
import { Link } from 'react-router-dom'
import MenuButton from './MenuButton'
import HeaderRightElement from './HeaderRightElement'



const Header = () => {
  const [menuToggle,setMenuToggle] = useState(false)
  

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__container__left'>
          <div className='brand-logo btn'>
            <Link to={"/home"} className='container__flex--center--column' >
              <img src="/icons/Brand_Logo.png"
                alt="Easyshift - an easy way to change your day"
                title="Easyshift - an easy way to change your day"
              />
            </Link>
          </div>
            <Nav />
        </div>
        <div className='header__right-elements container__flex--center--row'>
          <HeaderRightElement src={"/icons/notifications.svg"}  text={"Notifications"}/>
          <HeaderRightElement src={"/icons/profile.svg"}  text={"Profile"}/>
          <MenuButton
            menuToggle={menuToggle}
            setMenuToggle={(value) => setMenuToggle(value)}
          />
        </div>
       
      </div>
    </header>
  )
}

export default Header

