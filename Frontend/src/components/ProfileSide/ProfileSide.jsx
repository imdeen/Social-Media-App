import React from 'react'
import './ProfileSide.css'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import FollowerCard from '../FollowerCard/FollowerCard'

const Profileside = () => {
  return (
    <div className='profileSide'>
      <LogoSearch/>
      <ProfileCard location='homePage'/>
      <FollowerCard/>
    </div>
  )
}

export default Profileside