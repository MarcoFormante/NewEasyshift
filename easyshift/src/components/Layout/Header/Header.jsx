import React, { useEffect, useState } from 'react'
import Nav from './Nav/Nav'
import { Link } from 'react-router-dom'
import MenuButton from './MenuButton'
import HeaderRightElement from './HeaderRightElement'
import HeaderSidebar from './HeaderSidebar'
import axios from '../../../AxiosApi/axios'
import { useSelector } from 'react-redux'




const Header = () => {
  const [menuToggle,setMenuToggle] = useState(false)
  const [windowToggle, setWindowToggle] = useState(false)
  const [windowType, setWindowType] = useState("")
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const userInfo = useSelector(state => state.userInfo.value)
  const [hasNotifications, setHasNotifications] = useState(false)
 
  
  
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
  }, [windowWidth])
  

  useEffect(() => {
      if (menuToggle) {
        document.body.className = "fixed"
      } else {
        document.body.className = ""
      }
    
  }, [menuToggle])


  //Check if User Has new Notifications
  useEffect(() => {
    
      const formdata = new FormData()
      formdata.append("action", "checkNotifications")
      formdata.append("userId",userInfo.userID)
      axios.post(process.env.REACT_APP_API_URL + "notificationApi.php", formdata
      ).then(response => {
        console.log(response.data);
        if (response.data.totalNotifications) {
          setHasNotifications(true)
        } else {
          setHasNotifications(false)
        }
      })
  },[window.location.pathname])

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__container__left'>
          <div className='brand-logo btn'>
            <Link to={"/home"} className='container__flex--center--column' >
              <img src="/icons/Brand_Logo_new.svg"
                alt="Easyshift - an easy way to change your day"
                title="Easyshift - an easy way to change your day"
              />
            </Link>
          </div>
          <Nav menuToggle={menuToggle} setMenuToggle={(value)=>setMenuToggle(value)} />
        </div>
        <div className='header__right-elements container__flex--center--row'>
          <HeaderRightElement
            src={`/icons/notifications${hasNotifications ? "_active" :""}.svg`}
            windowToggle={windowToggle}
            onClick={() => {
              handleWindowToggle("Notifications")
              setHasNotifications(false)
            }}
            text={"Notifications"}
            element="notification"
            hasNotifications={hasNotifications}
          />
          <HeaderRightElement
            src={"/icons/profile.svg"}
            windowToggle={windowToggle}
            onClick={() => handleWindowToggle("Profile")}
            text={"Profile"}
            element="profile"
          />
          <MenuButton
            menuToggle={menuToggle}
            setMenuToggle={(value) => setMenuToggle(value)}
          />
        </div>
      </div>
      <HeaderSidebar windowToggle={windowToggle} handleWindowToggle={(value)=>handleWindowToggle(value) } windowType={windowType } />
    </header>
  )
}

export default Header


