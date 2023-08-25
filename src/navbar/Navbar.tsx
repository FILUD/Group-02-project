import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css'
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';






function Navbar() {
  
  const clientId = '72831622081-thqra06krh8p7murespj7d3raettjdfk.apps.googleusercontent.com';
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const onSuccess = (res: any) => {
    setProfile(res.profileObj);
    console.log('success', res);
  };

  const onFailure = (res: any) => {
    console.log('failure', res);
  };


  const logOut = () => {
    setProfile(null);
    localStorage.removeItem('UsersId');
    localStorage.removeItem('UsersObj');
    navigate('/');
  };
  

  //menu select 
  // const [open, setOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const menuItems = [
  //   { name: 'Home', path: '/home' },
  //   { name: 'Profile', path: '/profile' },
  //   { name: 'About', path: '/about' },
  //   { name: 'History', path: '/history' },
  //   // Add more items and paths here...
  // ];

  // const handleItemClick = (item: any) => {
  //   setSelectedItem(item);
  //   navigate(item.path); // Use useNavigate for navigation
  // };

  const handleAbout = () => {
    navigate('/about')
    console.log('Button clicked');
   }

   const handleHistory = () => {
    navigate('/history')
    console.log('Button clicked');
   }

   const handleProfile = () => {
    navigate('/profile')
    console.log('Button clicked');
   }
   const handleHome= () => {
    navigate('/home')
    console.log('Button clicked');
   }


  return (
    <div >
      
        <nav>
        {profile ? (
          <div className="navbar-conten">
            <img 
            onClick={handleHome}
            src='./image/logo.png' className='Logo'/>
            <img
              className="image-pro" onClick={handleProfile}
              src={profile.imageUrl}
              alt="user image"
            />
            <div className='about'>
                <span onClick={handleHome}>Home</span>
                <span onClick={handleHistory}>History</span>
                <span onClick={handleAbout}>About Us</span>
                
            </div>
            {/* <h3 className="names_email">
              <strong>{profile.name}</strong>
            </h3> */}
            {/* <div className='icon'>
            <FormatListBulletedIcon  onClick={() => setOpen(!open)}/>
            </div> */}
            {/* {open && (
              <div className="menu-box">
                {menuItems.map((item) => (
                  <p
                    className="menu"
                    key={item.name}
                    onClick={() => handleItemClick(item)}
                    style={{
                      cursor: 'pointer',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    }}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            )} */}
            </div>
            
        ):(
          <GoogleLogin
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        )}
        </nav>
    </div>
  )
}

export default Navbar