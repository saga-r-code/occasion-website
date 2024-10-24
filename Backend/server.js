// server.js
import express from 'express';
import bookingrouter from './api/user/booking.js';
import signuprouter from './api/user/signup.js';
import loginrouter from './api/user/login.js'
import cors from 'cors'


const app = express();
const port = 3000;

app.use(cors())

app.use(express.json())

app.use(bookingrouter) //app.use('/booking', bookingrouter)
app.use(signuprouter) //app.use('/signup', signuprouter)
app.use(loginrouter) //app.use('/login', loginrouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // console.log('User input:', userInput);
});
