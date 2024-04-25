import React, { useState } from 'react'
import profile from "../../img/profile.svg";
import {useDispatch, useSelector} from 'react-redux';
import { followUser, unfollowUser } from '../../actions/UserAction';


const User = ({person}) => {
  const dispatch = useDispatch()
  const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER
  const { user } = useSelector((state) => state.authReducer.authData)
  const [following, setFollowing] = useState(person.followers.includes(user._id))

  const handleFollow = () => {
    following? 
    dispatch(unfollowUser(person._id, user)) :
    dispatch(followUser(person._id, user))

    setFollowing((prev)=>!prev)
  }

  return (
    <div className='followers'>
                    <div>
                     <img className='followerimg' src={person.coverPicture? serverPublic + person.profilePicture : profile}  alt="follower image" />
                     <div className='name'>
                        <span>{person.firstname}</span>
                        <span>{person.email}</span>
                     </div>
                    </div>
                    <button className='button fc-button' onClick={handleFollow}>{following ? "unfollow" : "follow"}</button>
                </div>
  )
}

export default User