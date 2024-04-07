import React from 'react'
import FollowerCard from '../../components/FollowerCard/FollowerCard'
import InfoCard from '../../components/InfoCard/InfoCard'
import './Profile.css'
import RightSide from '../../components/RightSide/RightSide'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import PostSide from '../../components/PostSide/PostSide'

const Profile = () => {
  return (
    <div className='profile'>
      <ProfileLeft/>

      <div className='Profile-center'>
      <ProfileCard location = 'profilePage'/>
      <PostSide/>
      </div>

      <RightSide/>
     
    </div>
  )
}

export default Profile