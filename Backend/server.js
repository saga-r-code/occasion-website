// server.js
import express from 'express';
import bookingrouter from './api/user/booking.js';
import signuprouter from './api/user/signup.js';
import loginrouter from './api/user/login.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true // Enable credentials (cookies)
}))

app.use(cookieParser());

app.use(express.json())

app.use(bookingrouter) //app.use('/booking', bookingrouter)
app.use(signuprouter) //app.use('/signup', signuprouter)
app.use(loginrouter) //app.use('/login', loginrouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // console.log('User input:', userInput);
});
