
import  { useEffect, useState } from 'react'
import './home.css'
import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Navbar from '../navbar/Navbar';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type choice={
  card_id:string;
  image: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<any>(null)
  const [select, setSelect] = useState<string[]>([])
  const navigate = useNavigate();


  const handleSelection = (card_id: string) => {
    if (select.includes(card_id)) {
      setSelect((prevSelected) => prevSelected.filter((choice) => choice !== card_id));
    } else {
      if (select.length < 5) {
        setSelect((prevSelected) => [...prevSelected, card_id]);
      } 
    }
  };

  console.log(select);

  const handleContinue = () => {
    if (select.length < 5) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select 5 item',
      })
    } else {
      const queryParams = select.map((choice) => `choice=${choice}`).join('&')
      navigate('/results')
    }
    console.log('Button clicked');
  };

  //check selected == 5?
  useEffect(() => {
    if (select.length == 5) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Selected 5 item',
        showConfirmButton: false,
        timer: 1500
      })
    }else {

    }
  }, [select]);

  // Load the data from localStorage when the component mounts
  useEffect(() => {
    const storedMostAnimal = localStorage.getItem('mostAnimal');
    if (storedMostAnimal) {
      setSelect(JSON.parse(storedMostAnimal));
    }
  }, []);

  // Load the data from localStorage when the component mounts
  useEffect(() => {
    const storedMostAnimal = localStorage.getItem('leastAnimal');
    if (storedMostAnimal) {
      setSelect(JSON.parse(storedMostAnimal));
    }
  }, []);

  // Update the data in localStorage whenever selectedCharacters changes
  useEffect(() => {
    localStorage.setItem('leastAnimal', JSON.stringify(select));
  }, [select]);

  useEffect(() =>{
    fetch('http://localhost:3007/card')
    .then(res => res.json())
    .then(data => setData(data))
  },[])
  console.log(data)


  return (
    <div className='nav-home'>
      <Navbar />
    <div className='conten'>
    {data ? (
      <>
      <h1>ผู้นำ 4 ทิศ</h1>
      <h2>เลือก 5 ข้อข้างล่างนี้ที่ไม่ใช่ตัวคุณ</h2>
      <div className='box-conten'>
      
      {data.data.map((choice:any) => (
        
        <div className='choicetxt' key={choice.card_id} >
          <div className={`item ${select.includes(choice.card_id)? 'checked' : 'defult'}`}>
          {/* <h3>{choice.description}</h3> */}
          
          <button className='btnchoice'>
          <img className='imagechoice'  src={choice.card_pic} onClick={() =>{
            handleSelection(choice.card_id)
          }}/>
          </button>
        </div>
        </div>
        
      ))}
      
       
    </div>
        <button onClick={handleContinue} className='btnnext'>CONTINUE <ArrowForwardIcon/></button></>
    ):(
      <>
      <h3>login</h3>
      </>
    )}
    </div>
    </div>
  )
  
}


export default Home