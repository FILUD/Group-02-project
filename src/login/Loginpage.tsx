import React from 'react'
import './login.css'

import { Navigate } from 'react-router-dom';

function Testlogin() {
  const handleClick = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();
    console.log('Button clicked');
  }
  // const logout =() =>{
  //   localStorage.removeItem('token')
  //   Navigate('/')
  // }
  
  return (
<>
    <div className='page'>
       
    <div className='cover'>
        <h1>Login</h1>
        <input type='text' placeholder='Username'/>
        <input type='password' placeholder='password'/>
        
        <div className='login-btn'>Login</div>
        <p className='text'>Or login using</p>

        <div className='alt-login'>

            <div className='google'>
            <p onClick={handleClick}>google login</p>
            </div>
        </div>
    </div>
    </div>



    </>
  )
}

export default Testlogin