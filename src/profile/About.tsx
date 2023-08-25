import React from 'react'
import './about.css'
import Navbar from '../navbar/Navbar'

function About() {

  return (
    <div > 
        <div className='row'>
          <Navbar/>
        </div>
        <div className='boximg-team'>
        <img src='./image/R.png' className='img-team'/>
        </div>
        <div className='boc-box'>
          <div className='end'>
            <img src='./image/OIP.png' className='fontend'/>
            <h3>Database</h3>
            </div>
            <div className='end'>
            <img src='./image/OIP.png' className='fontend'/>
            <h3>Front-end</h3>
            </div>
            <div className='end'>
            <img src='./image/OIP.png' className='fontend'/>
            <h3>UX/UI</h3>
            </div>
             <div className='end'>
            <img src='./image/OIP.png' className='fontend'/>
            <h3>Back-end</h3>
            </div>
        </div>
        
    </div>
  )
}

export default About