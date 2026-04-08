// import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../schema/user.js';
// import { JWT_SECRET } from './serverConfig.js';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './serverConfig.js';

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists by googleId
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    // Check if email already registered locally
                    user = await User.findOne({ email: profile.emails[0].value });

                    if (user) {
                        // Link Google to existing local account
                        user.googleId = profile.id;
                        user.authProvider = 'google';
                        user.isVerified = true;
                        await user.save();
                    } else {
                        // Create brand new user
                        // Generate unique username from Google display name
                        let username = profile.displayName.replace(/[^a-zA-Z0-9]/g, '');
                        const existingUsername = await User.findOne({ username });
                        if (existingUsername) {
                            username = username + Math.floor(Math.random() * 1000);
                        }

                        user = await User.create({
                            email: profile.emails[0].value,
                            username,
                            avatar: profile.photos[0]?.value || `https://robohash.org/${username}`,
                            googleId: profile.id,
                            authProvider: 'google',
                            isVerified: true
                        });
                    }
                }

                return done(null, user);
            } catch (error) {
                console.error('Google OAuth error:', error);
                return done(error, null);
            }
        }
    )
);

export default passport;