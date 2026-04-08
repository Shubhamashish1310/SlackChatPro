import express from 'express';
import jwt from 'jsonwebtoken';

import passport from '../config/passportConfig.js';
import { FRONTEND_URL,JWT_EXPIRY, JWT_SECRET } from '../config/serverConfig.js';

const router = express.Router();

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false
    })
);

router.get('/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${FRONTEND_URL}/auth/signin?error=oauth_failed`
    }),
    (req, res) => {
        try {
            const token = jwt.sign(
                { _id: req.user._id },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRY }
            );
            res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
        } catch (error) {
            console.error('OAuth callback error:', error);
            res.redirect(`${FRONTEND_URL}/auth/signin?error=oauth_failed`);
        }
    }
);

export default router;