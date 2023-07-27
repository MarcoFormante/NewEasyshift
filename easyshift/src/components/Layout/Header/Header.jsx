import React from 'react'
import Nav from './Nav/Nav'


const Header = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__container__left'>
            <div className='brand-logo'>Logo</div>
            <Nav />
        </div>
        <div className='menu-btn btn'>
          <span className='menu-btn__line'></span>
          <span className='menu-btn__line'></span>
          <span className='menu-btn__line'></span>
        </div>
      </div>
    </header>
  )
}

export default Header
