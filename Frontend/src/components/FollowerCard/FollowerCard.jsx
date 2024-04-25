import React, { useEffect, useState } from 'react';
import './FollowerCard.css';
import User from '../User/User.jsx';
import { getAllUser } from '../../api/UserRequest.js';
import { useSelector } from 'react-redux';
 
const FollowerCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async() => {
      const {data} = await getAllUser();
      setPersons(data)
      console.log(data)
    };
    fetchPersons()
  },[]);

  return (
    <div className='FollowerCard'>
        <h3>People u may know</h3>
        {persons.map((person, id) => {
          if(person._id !== user._id){
            return(
                <User person={person} key={id}/>
            )}
        })}
    </div>
  )
}

export default FollowerCard