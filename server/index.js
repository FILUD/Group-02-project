const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user:'root',
    host:'locolhost',
    password:'',
    database:'data_email'
})

app.get('/users', (req,res) =>{
    db.query('SELECT * FROM gmail', (error, results) => {
        if (error) {
          return res.status(500).send({ error: true, message: 'Error fetching data from the database' });
        }
        let message = '';

        if (results === undefined || results.length === 0) {
          message = 'User table data is null';
        } else {
          message = 'Successfully select all users';
        }
    
        return res.send({ error: false, data: results, message: message });
    })
})
app.post('/users', (req, res) => {
    const {Username, email } = req.body;
  
    if (!Username || !email) {
      return res.status(400).send({ error: true, message: 'Please input all data' });
    }
  
    dbCon.query('INSERT INTO gmail ( username, email) VALUES ( ?, ?)', [ Username, email], (error) => {
      if (error) {
        return res.status(500).send({ error: true, message: 'Error inserting data into the database' });
      }
  
      return res.send({ error: false, data: { Username, email }, message: 'User registration successful' });
    });
  });
  

  // Start the server
app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
  });