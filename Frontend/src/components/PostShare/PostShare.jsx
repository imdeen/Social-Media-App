import React, { useRef, useState } from 'react';
import profile from "../../img/profile.svg";
import './PostShare.css';
import {UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes} from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';



const PostShare = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state)=> state.postReducer.uploading)
  const {user} = useSelector((state) =>state.authReducer.authData)
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  
  const onImageChange = (e) => {
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0];
      setImage(img);
    }
  };

  
//handle post upload
  const handleUpload = async(e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }

    //if there is an image availaible with post
    if(image){
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch(error){
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost))
    resetShare();
  }

  //reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value= "";
  }

  const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;

  return (
    <div className='PostShare'>
        <img src={user.profilePicture? serverPublic + user.profilePicture : profile} alt="profile image" style={{background: "grey"}} />
        <div> <input ref={desc} required type='text' placeholder='Whats"s happening' />
      

        </div>


      <div className='postOption-main'>
        <div className="PostOptions">
            <div className="option" style={{color: "var(--photo)"}}
            onClick={() => imageRef.current.click()}
            ><UilScenery/>Photo
            </div>
            <div className="option" style={{color: "var(--video)"}}> <UilPlayCircle/>Video</div>
            <div className="option" style={{color: "var(--location)"}}><UilLocationPoint/>Location</div>
            <div className="option" style={{color: "var(--schedule)"}}><UilSchedule/> Schedule</div>
            <button 
            className='button ps-button'
            onClick={handleUpload}
            disabled={loading}
            >{loading? "uploading..." : "share" }</button>
            <div style={{display: 'none'}}>
              <input type="file" 
              name='myImage'
              ref={imageRef}
              onChange={onImageChange}
              />
            </div>
        </div>
        {image && (
          <div className='previewImage'>
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="uploaded image"/>
          </div>
        )}
        </div>

      
    </div>
  )
};

export default PostShare