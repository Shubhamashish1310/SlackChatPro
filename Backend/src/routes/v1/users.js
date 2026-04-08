import express from 'express';

import { signIn, signUp } from '../../controllers/userController.js';
import { authenticateUser } from '../../middlewares/authMiddleware.js';
import User from '../../schema/user.js';
import { internalErrorResponse,successResponse } from '../../utils/common/responseObjects.js';
import { userSignInSchema, userSignUpSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/signup', validate(userSignUpSchema), signUp);
router.post('/signin', validate(userSignInSchema), signIn);

router.get('/me', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // ✅ req.userId
        return res.status(200).json(successResponse(user, 'User fetched successfully'));
    } catch (error) {
        return res.status(500).json(internalErrorResponse(error));
    }
});

export default router;