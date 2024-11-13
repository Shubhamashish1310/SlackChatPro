import express from 'express';

import { signIn, signUp } from '../../Controllers/userController.js';
import { userSignInSchema, userSignUpSchema } from '../../Validation/zodUserValidation.js';
import { validate } from '../../Validation/zodValidatior.js';
import { isAuthenticated } from '../../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup',validate(userSignUpSchema) ,signUp)
router.post('/login',validate(userSignInSchema) ,signIn)

router.get('/',isAuthenticated, (req, res) => {
    res.status(200).json({
        name: 'Get all users',
        version: '1.0.0',
        owner: 'Shubham Ashish'
    });
});

export default router;