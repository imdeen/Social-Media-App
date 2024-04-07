import React from 'react';
import logo from '../../img/logo.png';
import './LogoSearch.css'
import {UilSearch} from '@iconscout/react-unicons'

const LogoSearch = () => {
  return (
    <div className='logoSearch'>
        <img src={logo} alt='logo'/>
        <div className='Search'>
            <input type='text' placeholder='#Explore'/>
            <div className='s-icon'>
             <UilSearch/>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch