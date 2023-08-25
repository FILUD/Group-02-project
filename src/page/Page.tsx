import React from 'react'
import './page.css'
import { Navigate, useNavigate } from 'react-router-dom';
import Google from '../google/Google';

function Page() {
  const navigate = useNavigate();

  const handleAbout = () => {
    navigate('/about')
    console.log('Button clicked');
   }

   

  //  <div className='page-box'>
  //  <div className='bg-content'>
  //      <img className="img1" src='./image/image 2.png'/>
  //        <div className="title1"><h2>habits by    clicking pictures</h2></div>
  //        <div onClick={handleAbout} className='title3'><h2>About Us</h2></div>
  //        <div className="title2"><h2>Testing habits</h2></div>
  //        <div className="describe"><h4>Testing habits are practices that testers use to ensure effective software testing, such as planning, attention to detail, collaboration, persistence, and continuous learning.</h4></div>
         
  //        <p className="btngoogle" ><Google/></p>
         
  //        <div className="bottom">
  //          <p>Privacy policy &nbsp;&nbsp;&nbsp;&nbsp; Term & conditions &nbsp;&nbsp;&nbsp;&nbsp; Security information</p>
  //        </div>
         
  //  </div>
  //  </div>

  // <button className='btn-google-login'>
  //       <img src='/logo/logo-google.png'/>
  //       <p className="btn-google-text">Sign in with Google</p></button>

  return (

    <>
    <div className='main-content-container'>
    <label className='header-main-content'>Testing habits</label><br />
    <label className='content-main'>Testing habits are practices that <br />
      testers use to ensure effective software <br />
      testing, such as planning, attention to<br />
      detail, collaboration, persistence, and <br />
      continuous learning.</label>
      <center className='btn-google'>
      <Google/>
      </center>
  </div>
  <div className="login-container">
    <div className='top-left-login'>
      <label className='text-login-about' onClick={handleAbout} >About Us</label>
    </div>
    <div className="login-content">
      <div className='text-habit  text-start'> habits by </div>
      <div className='text-habit  text-end'> clicking pictures</div>
    </div>
    <img src='/images/img-login.png' alt='Login' className="login-image" />
  </div>

  <div className='box-footer'></div>
  <footer className="footer">

    <div className="footer-left">
      <li className='li-login'>Privacy policy</li>
      <li className='li-login'>Terms & conditions</li>
      <li className='li-login'>Security information</li>
    </div>
    <div className="footer-right">
      <img className='space-icon' src='/icon/icon-facebook.png'></img>
      <img className='space-icon' src='/icon/icon-twitter.png'></img>
      <img className='space-icon' src='/icon/icon-youtube.png'></img>
    </div>
  </footer>
  </>

  )
  }

export default Page