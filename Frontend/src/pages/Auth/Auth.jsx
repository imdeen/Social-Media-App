import React, { useState } from 'react'
import logo from '../../img/logo.png'
import './Auth.css'
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const[confirmPassword, setConfirmPassword] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  console.log(loading);
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) => {
    
    e.preventDefault();
    if(isSignUp)
    {
      data.password === data.confirmPassword 
      ? dispatch(signUp(data)) 
      : setConfirmPassword(false);
    }else{
      dispatch(logIn(data));
    }
  }

  const resetForm = () => {
    setConfirmPassword(true);
    setData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <div className='Auth'>
        <div className='a-left'>
            <img src={logo} alt="" />
            <div className='Webname'>
              
              <h1>{isSignUp ? 'Sign Up Page' : 'Login Page' }</h1>
              <h6>Explore the idea throughtout the world</h6>
            </div>
        </div>
       
        <div className='a-right'>
      <form action="" className='infoForm authForm' onSubmit={handleSubmit}>
        <h1>{isSignUp ? "Sign Up": "Log In"}</h1>
        {isSignUp &&  
       <div>
       <input type="text" placeholder='First Name' className='InfoInput'
       name='firstname' onChange={handleChange} value={data.firstname}/>

       <input type="text" placeholder='Last Name' className='InfoInput'
       name='lastname' onChange={handleChange} value={data.lastname}/>
     </div> 

      }
      <div>
          <input type="text" placeholder='email' className='InfoInput' name='email' onChange={handleChange} value={data.email}/>
      </div>

        <div>
          <input type="password" placeholder='Password' className='InfoInput' name='password' onChange={handleChange} value={data.password}/>

          {isSignUp && 
          <input type="password" placeholder='Confirm Password' className='InfoInput' name='confirmPassword' onChange={handleChange} value={data.confirmPassword}/>}
        </div>
        <span style={{color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "35px",
              display: confirmPassword ? "none" : "block"}}>
            * confirm password is not same
        </span>

            
        <div>
        <span style={{cursor: "pointer"}} onClick={() => {setIsSignUp((prev) => !prev); resetForm()}}>
          {isSignUp ? "already has an account? login!" : "doesn't have account ? Signup!"} ? 
        </span>
        </div>

        <button className='button infoButton' type='submit' disabled={loading}> {loading ? "loading..." : isSignUp? "sign up" : "Log in"} </button>

        
      </form>
    </div>
      
    </div>
  )
}


export default Auth