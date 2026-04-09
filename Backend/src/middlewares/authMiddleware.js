import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/serverConfig.js';
import userRepository from '../repositories/userRepository.js';
import {
  customErrorResponse,
  internalErrorResponse
} from '../utils/common/responseObjects.js';

export const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'] 
            || req.headers.authorization?.split(' ')[1];
        
        if (!token) return res.status(401).json({ error: 'No token' });
        
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded._id;  // ✅ Fixed: _id not id
        next();
    } catch (error) {
        res.status(401).json({ error});
    }
};


export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({ message: 'No auth token provided' })
            );
        }

        const response = jwt.verify(token, JWT_SECRET);

        if (!response) {
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({ message: 'Invalid auth token provided' })
            );
        }

        // ✅ Fixed: _id instead of id (matches JWT sign payload)
        const user = await userRepository.getById(response._id || response.id);

        // ✅ Fixed: null check before accessing .id
        if (!user) {
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({ message: 'User not found' })
            );
        }

        req.user = user.id;
        next();
    } catch (error) {
        console.log('Auth middleware error', error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({ message: 'Invalid auth token provided' })
            );
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
};


