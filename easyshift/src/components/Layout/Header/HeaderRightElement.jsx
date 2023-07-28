import React from 'react'

const HeaderRightElement = ({src,text}) => {
  return (
    <div className='header__right-elements__container btn container__flex--center--column'>
        <img className='header__right-elements__container__img' src={src} alt="" />
        <span className='header__right-elements__container__text'>{text}</span>
    </div>
  )
}

export default HeaderRightElement
