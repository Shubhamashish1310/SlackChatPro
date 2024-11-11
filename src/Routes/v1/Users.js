import express from 'express';

import { signUp } from '../../Controllers/userController.js';

const router = express.Router();

router.post('/signup',signUp)

router.get('/', (req, res) => {
    res.status(200).json({
        name: 'Get all users',
        version: '1.0.0',
        owner: 'Shubham Ashish'
    });
});

export default router;