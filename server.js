const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const {handleRegister} = require('./controllers/register.js');
const {handleSignIn} = require('./controllers/signin.js');
const {handleImage, handleAPI} = require('./controllers/image.js');
const {handleProfile} = require('./controllers/profile.js');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '24438839',
    database: 'face_recognition'
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Server Okay') })

app.post('/signin', handleSignIn(db, bcrypt));

app.post('/register', handleRegister(db, bcrypt));

app.get('/profile/:id', handleProfile(db));

app.put('/image', handleImage(db));

app.post('/imageURL', handleAPI);




app.listen(process.env.PORT || 3000, () => {
  console.log(`App -> Listening at ${process.env.PORT}`);
});
