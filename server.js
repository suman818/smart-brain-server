const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const knex = require('knex');
const cors = require('cors');
const app = express();
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  }
});
 
const saltRounds = 10 // increase this if you want more iterations  

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json('server is working');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, bcrypt, db)} );
app.post('/register',(req, res) => { register.handleRegisters(req, res, bcrypt, db, saltRounds)})
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)});
app.put('/image',(req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl',(req, res) => { image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000,  "0.0.0.0", () => console.log(`listening on port ${process.env.PORT}`)); 
