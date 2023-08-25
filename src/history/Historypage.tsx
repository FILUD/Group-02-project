import React, { useEffect, useState } from 'react';
import './history.css';
import Navbar from '../navbar/Navbar';
import axios from 'axios';

interface PlayRecord {
  play_id: number;
  user_id: number;
  personality_id: number;
  play_date: string;
  play_time: string;
  like_selected: string;
  notlike_selected: string;
}

interface CardDescription {
  description_en: string | null;
  description_th: string | null;
}

interface PersonalityMapping {
  [key: number]: string;
}

const personalityMapping: PersonalityMapping = {
  1: 'กระทิง',
  2: 'หนู',
  3: 'หมี',
  4: 'เหยี่ยว',
};

function getPersonalityName(personalityId: number): string {
  return personalityMapping[personalityId] || 'Unknown';
}

async function fetchCardDescription(cardId: number): Promise<string> {
  try {
    const response = await axios.post('http://127.0.0.1:3007/card/byid', {
      card_id: cardId,
    });
    return response.data.data?.description_th || 'N/A';
  } catch (error) {
    console.error('Error fetching card description:', error);
    return 'N/A';
  }
}

function Historypage() {
  const [playHistory, setPlayHistory] = useState<PlayRecord[]>([]);
  const [cardDescriptions, setCardDescriptions] = useState<{ [playId: number]: { like_selected: string, notlike_selected: string } }>({});

  useEffect(() => {
    async function fetchData() {
      const userEmail = localStorage.getItem('userEmail');
      const userResponse = await axios.post('http://127.0.0.1:3007/get/id_user', {
        email: userEmail,
      });
      const userId = userResponse.data.user_id;
  
      try {
        const historyResponse = await axios.post('http://127.0.0.1:3007/get/history', {
          user_id: userId,
        });
  
        // Sort the play history by the play_date and play_time
        const sortedPlayHistory = historyResponse.data.playHistory.sort((a: { play_id: number; }, b: { play_id: number; }) => {
          return b.play_id - a.play_id;
        });
  
        setPlayHistory(sortedPlayHistory)
  
        const descriptions: { [playId: number]: { like_selected: string, notlike_selected: string } } = {};
  
        await Promise.all(
          sortedPlayHistory.map(async (play: { like_selected: string; notlike_selected: string; play_id: number; }) => {
            const likeDescriptions = await Promise.all(
              play.like_selected.split(' ').map(async (cardIdStr) => {
                const cardId = parseInt(cardIdStr, 10);
                return await fetchCardDescription(cardId);
              })
            );
  
            const notLikeDescriptions = await Promise.all(
              play.notlike_selected.split(' ').map(async (cardIdStr) => {
                const cardId = parseInt(cardIdStr, 10);
                return await fetchCardDescription(cardId);
              })
            );
  
            descriptions[play.play_id as number] = {
              like_selected: likeDescriptions.join(', '),
              notlike_selected: notLikeDescriptions.join(', '),
            };
          })
        );
  
        setCardDescriptions(descriptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);
  
  

  return (
    <div>
      <div>
        <Navbar />
      </div>
      {playHistory.map((play, index) => (
        <div className="box-history" key={play.play_id}>
          <h3>สิ่งที่เลือก 10 ข้อข้างล่างนี้ที่แทนความเป็นตัวคุณ</h3>
          {cardDescriptions[play.play_id]?.like_selected}
          <br />
          <br />
          <h3>สิ่งที่เลือก 5 ข้อข้างล่างนี้ที่ไม่ใช่ตัวคุณ</h3>
          {cardDescriptions[play.play_id]?.notlike_selected}
          <br />
          <br />
          <h3>ผลที่ได้</h3>
          {getPersonalityName(play.personality_id)}
          <br />
          <br />
          <div className="date-user">
            <br />
            <h5>
              {play.play_date} : {play.play_time}
            </h5>
          </div>
          <div className="text-history" key={play.play_id}></div>
          <div className="boximg-history">
            <img src={`/animal/${getPersonalityName(play.personality_id)}.jpg`} className="img-history" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Historypage;


           
        // <hr />
        // <center>
        // <p>Play ID: {play.play_id}</p>
        // <p>User ID: {play.user_id}</p>
        // <p>Personality ID: {play.personality_id}</p>
        // <p>Play Date: {play.play_date}</p>
        // <p>Play Time: {play.play_time}</p>
        // <p>Liked Selected: {play.like_selected}</p>
        // <p>Not Liked Selected: {play.notlike_selected}</p>
        // </center>
        // <hr />