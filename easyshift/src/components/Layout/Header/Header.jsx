import React, { useEffect, useState } from 'react'
import Nav from './Nav/Nav'
import { Link } from 'react-router-dom'
import MenuButton from './MenuButton'
import HeaderRightElement from './HeaderRightElement'
import HeaderSidebar from './HeaderSidebar'



const Header = () => {
  const [menuToggle,setMenuToggle] = useState(false)
  const [windowToggle, setWindowToggle] = useState(false)
  const [windowType, setWindowType] = useState("")
  const [windowWidth,setWindowWidth] = useState(window.innerWidth)
  
  function handleWindowToggle(windowTypeText) {
    setWindowToggle(!windowToggle)
    setWindowType(windowTypeText)
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth)
    })

    window.removeEventListener("resize", () => {
      setWindowWidth(window.innerWidth)
    })
  }, [setWindowWidth])
  
  useEffect(() => {
    if (windowWidth > 768 ) {
        setMenuToggle(false)
    }
  },[windowWidth])


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
          <Nav menuToggle={menuToggle} setMenuToggle={(value)=>setMenuToggle(value)} />
        </div>
        <div className='header__right-elements container__flex--center--row'>
          <HeaderRightElement src={"/icons/notifications.svg"} windowToggle={windowToggle} onClick={()=>handleWindowToggle("Notifications")} text={"Notifications"}/>
          <HeaderRightElement src={"/icons/profile.svg"}  windowToggle={windowToggle} onClick={()=>handleWindowToggle("Profile")} text={"Profile"}/>
          <MenuButton
            menuToggle={menuToggle}
            setMenuToggle={(value) => setMenuToggle(value)}
          />
        </div>
      </div>
      <HeaderSidebar windowToggle={windowToggle } handleWindowToggle={(value)=>handleWindowToggle(value) } windowType={windowType } />
    </header>
  )
}

export default Header


