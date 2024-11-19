// server.js
import express from 'express';
import bookingrouter from './api/user/booking.js';
import signuprouter from './api/user/signup.js';
import loginrouter from './api/user/login.js'
import logoutrouter from './api/user/logout.js'
import adminLogout from './api/admin/logout.js'
import loginadmin from './api/admin/login.js'
import signupadmin from './api/admin/signup.js'
import category from './api/admin/category.js'
import categoryManagementRouter from './api/admin/category_management.js'
import inclusionRouter from './api/admin/inclusion_table.js'
import imagesRouter from './api/admin/images_tables.js'
import customizationRouter from './api/admin/customization_table.js'
import bookingManagement from './api/admin/booking_management.js'

import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express();
const port = 3000;


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true // Enable credentials (cookies)
}))

app.use(cookieParser());

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(bookingrouter) //app.use('/booking', bookingrouter)
app.use(signuprouter) //app.use('/signup', signuprouter)
app.use(loginrouter) //app.use('/login', loginrouter)
app.use(logoutrouter) //app.use('/logoutuser', logoutrouter)
app.use(adminLogout) //app.use('/logoutadmin', adminLogout)
app.use(signupadmin) //app.use('/signupadmin', signupadmin)
app.use(loginadmin) //app.use('/loginadmin', loginadmin)
app.use(category) //app.use('/category',  category)
app.use(categoryManagementRouter) //app.use('/category_management', categoryManagementRouter)
app.use(inclusionRouter) //app.use('/inclusion', inclusionRouter)
app.use(imagesRouter) //app.use('/images', imagesRouter)
app.use(customizationRouter) //app.use('/customization', customizationRouter)
app.use(bookingManagement) //app.use('/booking_management', bookingManagement)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
