import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import InfoCard from '../InfoCard/InfoCard'
import FollowerCard from '../FollowerCard/FollowerCard'

const ProfileLeft = () => {
  return (
    <div>
        <LogoSearch/>
        <InfoCard/>
        <FollowerCard/>
    </div>
  )
}

export default ProfileLeft