import React, { useEffect, useState } from 'react';
import './results.css'
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResultPage: React.FC = () => {
  const [mostAnimalCounts, setMostAnimalCounts] = useState<{ animal: string; count: number; categoryId: number } | null>(null);
  const [description, setDescription] = useState<null>(null);
  const navigate = useNavigate();


  const handleContinue = () => {
    navigate('/home');
  }

  useEffect(() => {
    // Fetch data from localStorage
    const mostAnimal: number[] = JSON.parse(localStorage.getItem('mostAnimal') || '[]');
    const leastAnimal: number[] = JSON.parse(localStorage.getItem('leastAnimal') || '[]');

    // Count occurrences of animal types in "most" array
    const mostCounts: { [key: string]: number } = {
      bull: 0,
      rat: 0,
      bear: 0,
      falcon: 0,
    };

    mostAnimal.forEach((animalId) => {
      if (animalId >= 1 && animalId <= 21) {
        mostCounts.bull++;
      } else if (animalId >= 22 && animalId <= 42) {
        mostCounts.rat++;
      } else if (animalId >= 43 && animalId <= 63) {
        mostCounts.bear++;
      } else if (animalId >= 64 && animalId <= 84) {
        mostCounts.falcon++;
      }
    });

    // Count occurrences of animal types in "least" array
    const leastCounts: { [key: string]: number } = {
      bull: 0,
      rat: 0,
      bear: 0,
      falcon: 0,
    };

    leastAnimal.forEach((animalId) => {
      if (animalId >= 1 && animalId <= 21) {
        leastCounts.bull++;
      } else if (animalId >= 22 && animalId <= 42) {
        leastCounts.rat++;
      } else if (animalId >= 43 && animalId <= 63) {
        leastCounts.bear++;
      } else if (animalId >= 64 && animalId <= 84) {
        leastCounts.falcon++;
      }
    });

    // Calculate the differences
    const differences: { [key: string]: number } = {
      bull: mostCounts.bull - leastCounts.bull,
      rat: mostCounts.rat - leastCounts.rat,
      bear: mostCounts.bear - leastCounts.bear,
      falcon: mostCounts.falcon - leastCounts.falcon,
    };

    // Find the animal with the greatest difference
    const mostDifferentAnimal = Object.keys(differences).reduce((a, b) =>
      differences[a] > differences[b] ? a : b
    );

    const categoryIds: { [key: string]: number } = {
      bull: 1,
      rat: 2,
      bear: 3,
      falcon: 4,
    };

    setMostAnimalCounts({
      animal: mostDifferentAnimal,
      count: differences[mostDifferentAnimal],
      categoryId: categoryIds[mostDifferentAnimal],
    });
  }, []);



//get description :
  useEffect(() => {
    if (mostAnimalCounts && mostAnimalCounts.categoryId) {
      fetch(`http://127.0.0.1:3007/get/description`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categoryId: mostAnimalCounts.categoryId })
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setDescription_th(data.description_th);
          setDescription_en(data.description_en); 
          // console.log(data.description_th);
          // console.log(data.description_en);
        }
      });
    }
  }, [mostAnimalCounts]);

  const [description_th, setDescription_th] = useState('');
  const [description_en, setDescription_en] = useState('');


  useEffect(() => {
    if (mostAnimalCounts && mostAnimalCounts.categoryId) {
      fetch(`http://127.0.0.1:3007/get/description`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId: mostAnimalCounts.categoryId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setDescription_th(data.description_th);
            setDescription_en(data.description_en);
          }
        });
    }
  }, [mostAnimalCounts]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const dataPosted = localStorage.getItem('dataPosted');
  
        if (dataPosted === 'true') {
          console.log('Data already posted. Skipping post request.');
          return;
        }
  
        const userEmail = localStorage.getItem('userEmail');
        const response = await axios.post('http://127.0.0.1:3007/get/id_user', {
          email: userEmail,
        });
  
        const userId = response.data.user_id;
  
        // Check if necessary data exists in localStorage
        const mostAnimalData = JSON.parse(localStorage.getItem('mostAnimal') || '[]');
        const leastAnimalData = JSON.parse(localStorage.getItem('leastAnimal') || '[]');
        const mostAnimalCountsData = mostAnimalCounts || { categoryId: 0 };
  
        if (!mostAnimalData.length || !leastAnimalData.length) {
          console.log('Data missing in localStorage. Skipping post request.');
          return;
        }
  
        const postData = {
          user_id: userId,
          mostAnimal: mostAnimalData.join(' '),
          leastAnimal: leastAnimalData.join(' '),
          personality_id: mostAnimalCountsData.categoryId,
        };
  
        const postResponse = await axios.post('http://127.0.0.1:3007/post/result', postData);
        console.log('API response:', postResponse.data);
  
        // Set the flag to indicate data has been posted
        localStorage.setItem('dataPosted', 'true');
  
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };
  
    fetchUserData();
  }, [mostAnimalCounts]);
  
  


  return (
    <div>
      <Navbar />
      {mostAnimalCounts && (
        <><br/><br/><br/><br/>
        <center>
          <h2 className='h2-result'>As a result, you have the same habits as</h2>

          <p className='description-result'>{description_th}</p>
          <br /><br />
          </center>
          <center>
            <img className='img-mostAnimal' src={`/animal/${mostAnimalCounts.animal}.jpg`} alt={mostAnimalCounts.animal} />

            {/* <p>
              Most Different Animal: {mostAnimalCounts.animal} ({mostAnimalCounts.count}), Category ID: {mostAnimalCounts.categoryId}
            </p> */}
            <br /><br /><br /><br /><br />
            <button className='btn-start-again' onClick={handleContinue}>start again</button>
          </center>
        </>
      )}
    </div>
  );
};

export default ResultPage;
