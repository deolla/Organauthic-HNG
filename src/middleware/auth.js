// this middleware is used to authenticate the user by verifying the token sent in the request header
// if the token is valid, the user is authenticated and the request is passed to the next middleware
// if the token is invalid, the user is not authenticated and an error response is sent back to the client.


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.BATTLE_GROUND);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
