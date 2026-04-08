import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../schema/user.js';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './serverConfig.js';

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            proxy: true  // ✅ This fixes production/Render HTTPS proxy issues
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.findOne({ email: profile.emails[0].value });

                    if (user) {
                        user.googleId = profile.id;
                        user.authProvider = 'google';
                        user.isVerified = true;
                        await user.save();
                    } else {
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