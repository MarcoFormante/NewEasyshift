import React from 'react'

const MenuButton = ({menuToggle,setMenuToggle}) => {
  return (
    <div className={`menu-btn ${menuToggle ? "menu-btn--active" : ""} btn`} onClick={()=>setMenuToggle(!menuToggle)}>
        <span className='menu-btn__line'></span>
        <span className='menu-btn__line'></span>
        <span className='menu-btn__line'></span>
    </div>
  )
}

export default MenuButton
