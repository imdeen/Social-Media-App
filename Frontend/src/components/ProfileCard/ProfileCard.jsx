import React from 'react'
import './ProfileCard.css'
import Cover from '../../img/cover.jpg'
import profile from '../../img/profile.svg'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const ProfileCard = ({location}) => {
    const {user} = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state) => state.postReducer.posts);
    const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <div className='profileCard'>
        <div className="profileImages">
            <img src={user.coverPicture? serverPublic + user.coverPicture : Cover} alt='cover image'/>
            <img src={user.profilePicture? serverPublic + user.profilePicture : profile} alt='profile image' style={{background:"white"}}/>
        </div>
        <div className='ProfileName'>
            <span>{user.firstname} {user.lastname}</span>
            <span>{user.worksAt? user.worksAt : "write about yourself"}</span>
        </div>

        <div className='followStatus'>
            <hr/>
            <div>
                <div className='follow'>
                    <span>{user.following.length}</span>
                    <span>Followings</span>
                </div>
                <div className='vertical_line'></div>
                <div className='follow'>
                    <span>{user.followers.length}</span>
                    <span>Followers</span>
                </div>

                {location === 'profilePage' && (
                    <>
                    <div className='vertical_line'>

                    </div>
                    <div className='follow'>
                    <span>{posts.filter((post)=> post.userId === user._id).length}</span>
                    <span>Posts</span>
                    </div>
                    </>
                )}
            </div>
            <hr/>
        </div>
       {location ==='profilePage' ? '' : <span><Link to={`/profile/${user._id}`} style={{textDecoration: "none", color: "inherit"}}>My Profile</Link></span>}
    </div>
  )
}

export default ProfileCard