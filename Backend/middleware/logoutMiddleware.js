import jwt from 'jsonwebtoken';

const jwt_key = process.env.JWT_SAFE_KEY || 'occasion_sagee'



const logoutMiddleware = (req, res, next) => {
    const token = req.cookies.token;
 
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    else{
         jwt.verify(token, jwt_key, (err, decoded) => {
             if (err) {
                 return res.status(401).send({ message: 'Unauthorized' });
             }
             req.body.email = decoded.email;
             next();
         })
    }
 }

 export default logoutMiddleware