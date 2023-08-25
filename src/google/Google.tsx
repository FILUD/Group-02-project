import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';



const Google= () => {

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
    gapi.load("client:auth2", initClient);
  }, []);


  //login success
  const onSuccess = async (res: any) => {
    try {
        const userData = {
            first_name: res.profileObj.givenName,
            last_name: res.profileObj.familyName,
            email: res.profileObj.email,
            // imageUrl: res.profileObj.imageUrl,
        };

        // Check if the user already exists in the database
        const checkResponse = await axios.get(`http://localhost:3007/check-user?email=${userData.email}`);
        
        if (checkResponse.data.exists) {
            // User with the provided email already exists
            navigate(`/home`);
            return;
        }

        // User doesn't exist, post the new user data
        localStorage.setItem('userEmail', userData.email);
        const postResponse = await axios.post('http://localhost:3007/post/user', userData);
        console.log('API response: Login', postResponse.data);

        navigate(`/home`);
    } catch (error) {
        console.error('API error:', error);
        Swal.fire({
            title: 'Oops, something went wrong',
            iconHtml: '<img src="/icon/db-went-worng-min.png">',
            text: 'Please try again or contact the administrator.',
            customClass: {
                icon: 'no-border'
            }
        });
    }
};


  //set statas login if false cannot go orther pages
  const onFailure = (res: any) => {
    console.log('failed', res);
  };

  const logOut = () => {
    setProfile(null);
  };


  const [loginError, setLoginError] = useState('');

  //change language
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

  useEffect(() => {
    localStorage.setItem('selectedLanguage', selectedLanguage);
  }, [selectedLanguage]);

  return (

          <GoogleLogin
            className='google-button'
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}

          />

  );
};

export default Google;
