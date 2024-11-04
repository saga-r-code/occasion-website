// server.js
import express from 'express';
import bookingrouter from './api/user/booking.js';
import signuprouter from './api/user/signup.js';
import loginrouter from './api/user/login.js'
import logoutrouter from './api/user/logout.js'
import loginadmin from './api/admin/login.js'
import category from './api/admin/category.js'
import categoryManagementRouter from './api/admin/category_management.js'
import category_item from './api/admin/category_item_fetch.js'
import category_delete from './api/admin/category_item_delete.js'
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
app.use(logoutrouter) //app.use('/logoutuser', logoutrouter)
app.use(loginadmin) //app.use('/loginadmin', loginadmin)
app.use(category) //app.use('/category',  category)
app.use(categoryManagementRouter) //app.use('/category_management', categoryManagementRouter)
app.use(category_item) //app.use('/categoryitem', category_item)
app.use(category_delete) //app.use('/categorydelete', category_delete)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
