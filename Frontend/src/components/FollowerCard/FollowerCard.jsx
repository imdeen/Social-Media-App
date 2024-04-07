import React from 'react';
import './FollowerCard.css';
import {Followers} from '../Data/Data.js'

const FollowerCard = () => {
  return (
    <div className='FollowerCard'>
        <h3>Who is following you</h3>
        {Followers.map((follower, id) => {
            return(
                <div className='followers' key={id}>
                    <div>
                     <img className='followerimg' src={follower.img}  alt="follower image" />
                     <div className='name'>
                        <span >{follower.name}</span>
                        <span>@{follower.username}</span>
                     </div>
                    </div>
                    <button className='button fc-button'>Follow</button>
                </div>
            )
        })}

    </div>
  )
}

export default FollowerCard