import express from 'express';

import { signUp } from '../../Controllers/userController.js';
import { userSignUpSchema } from '../../Validation/zodUserValidation.js';
import { validate } from '../../Validation/zodValidatior.js';

const router = express.Router();

router.post('/signup',validate(userSignUpSchema) ,signUp)

router.get('/', (req, res) => {
    res.status(200).json({
        name: 'Get all users',
        version: '1.0.0',
        owner: 'Shubham Ashish'
    });
});

export default router;