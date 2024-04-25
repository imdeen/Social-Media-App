import * as React from 'react';
import Modal from '@mui/material/Modal';
import './ProfileModel.css'
import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../actions/UserAction';
import {uploadImage} from '../../actions/UploadAction'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ProfileModal({open, setOpen, data}) {
  const {password, ...other} = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const {user} = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  } 

  const onImageChange = (e) => {
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0];
      e.target.name === "profileImage"
       ? setProfileImage(img)
       : setCoverImage(img);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if(profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data))   
      } catch (error) {
        console.log(error); 
      }
    }
    if(coverImage){
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setOpen(false);
  }
  
  

  return (
   
    
 
    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
        <div className='formBox'>

        <form action="">

            <div className='input-field'>
            <TextField id="outlined-basic" name='firstname' label="First Name" variant="outlined" onChange={handleChange} value={formData.firstname}/>
            <TextField id="outlined-basic" name='lastname' label="last Name" variant="outlined" onChange={handleChange} value={formData.lastname}/>
            </div>
            

            <div  className='input-field'>
            <TextField id="outlined-basic" name='workAt' label="works at?" variant="outlined" onChange={handleChange} value={formData.workAt}/>
            </div>

            <div  className='input-field'>
            <TextField id="outlined-basic" name='livesIn' label="Lives in" variant="outlined" onChange={handleChange} value={formData.livesIn}/>
            <TextField id="outlined-basic" name='country' label="country" variant="outlined" onChange={handleChange} value={formData.country}/>
            </div>

            
            <div  className='input-field'>
            <TextField id="outlined-basic" name='relationship' label="relationship status" variant="outlined" onChange={handleChange} value={formData.relationship}/>
            </div>

            <div>
            Profile Image
            <input type="file" name='profileImage' onChange={onImageChange}/>
            Cover Image
            <input type="file" name='coverImage' onChange={onImageChange}/>
            </div>

            <button className='form-botton button' type='submit' onClick={handleSubmit}> Update</button>



        </form>

        </div>
    

    </Modal>


    
    );
}

export default ProfileModal;