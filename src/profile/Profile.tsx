import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom'
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import './profile.css'

function Profile() {
    const clientId = '220705506581-o26p70h1n398oe8femfdl473cintfhtg.apps.googleusercontent.com'
    const [profile, setProfile] = useState<any>(null)
    const navigate = useNavigate();

    useEffect(() =>{
        const initClient = () =>{
            gapi.client.init({
                clientId: clientId,
                scope:''
            })
        }
        gapi.load('client:auth2', initClient)
    },[])

    const onSuccess = (res: any) => {
        setProfile(res.profileObj)
        console.log("susccess", res);
      };
      const onFailure = (res: any) => {
        console.log('failure',res);
        
      };
    
      const logOut =() =>{
        setProfile(null)
        localStorage.removeItem('UsersId')
        localStorage.removeItem('UsersObj')
        navigate('/');
    
      }
  return (
    <div className='box-profile'>
        <Navbar/>
        {profile ? (
        <div className='proflie-conten'>
            <h1>Profile :</h1>
        <img className='img' src={profile.imageUrl} alt='user image' />
              <br />
              <br />

              <p>Name: <strong>{profile.name}</strong></p>
              <p>Email: <strong>{profile.email}</strong></p>
              <br /><br />
              
              <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={logOut}
                
              />
        </div>
        ):(
            <GoogleLogin 
        clientId={clientId}
        
        onSuccess={onSuccess}
        className='btn-google'
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true} />
        )}
    </div>
  )
}

export default Profile