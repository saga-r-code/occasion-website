// server.js
import express from 'express';
import bookingrouter from './api/user/booking.js';
import signuprouter from './api/user/signup.js';
import loginrouter from './api/user/login.js'
import logoutrouter from './api/user/logout.js'
import loginadmin from './api/admin/login.js'
import signupadmin from './api/admin/signup.js'
import category from './api/admin/category.js'
import categoryManagementRouter from './api/admin/category_management.js'
import category_item from './api/admin/category_item_fetch.js'
import category_delete from './api/admin/category_item_delete.js'
import category_id_fetch from './api/admin/category_item_fetchby_id.js'
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
  credentials: true // Enable credentials (cookies)
}))

app.use(cookieParser());

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(bookingrouter) //app.use('/booking', bookingrouter)
app.use(signuprouter) //app.use('/signup', signuprouter)
app.use(loginrouter) //app.use('/login', loginrouter)
app.use(logoutrouter) //app.use('/logoutuser', logoutrouter)
app.use(signupadmin) //app.use('/signupadmin', signupadmin)
app.use(loginadmin) //app.use('/loginadmin', loginadmin)
app.use(category) //app.use('/category',  category)
app.use(categoryManagementRouter) //app.use('/category_management', categoryManagementRouter)
app.use(category_item) //app.use('/categoryitem', category_item)
app.use(category_delete) //app.use('/categorydelete', category_delete)
app.use(category_id_fetch) //app.use('/categoryid', category_id_fetch)
app.use(inclusionRouter) //app.use('/inclusion', inclusionRouter)
app.use(imagesRouter) //app.use('/images', imagesRouter)
app.use(customizationRouter) //app.use('/customization', customizationRouter)
app.use(bookingManagement) //app.use('/booking_management', bookingManagement)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
