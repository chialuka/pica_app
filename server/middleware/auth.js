import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import dotenv from 'dotenv';
import { Users } from '../models';
import { generateToken } from '../utils';

dotenv.config();

const {
  HASH_SECRET,
  GOOGLE_ID,
  GOOGLE_SECRET,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
  BACKEND_URL,
} = process.env;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: HASH_SECRET,
};

const jwtStrategy = passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await Users.findOne({ where: { id: payload.id } });
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }),
);

const googleStrategy = passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: `${BACKEND_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, cb) => {
      process.nextTick(async () => {
        try {
          const user = await Users.findOne({ where: { googleId: profile.id } });
          const userObject = user;
          const token = generateToken(profile.id);
          userObject.token = token;
          return cb(null, userObject);
        } catch (error) {
          return cb(error, false);
        }
      });
    },
  ),
);

const facebookStrategy = passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_ID,
      clientSecret: FACEBOOK_SECRET,
      callbackURL: `${BACKEND_URL}/auth/facebook/callback`,
    },
    (accessToken, refreshToken, profile, cb) => {
      process.nextTick(async () => {
        try {
          const user = await Users.findOne({ where: { googleId: profile.id } });
          const userObject = user;
          const token = generateToken(profile.id);
          userObject.token = token;
          return cb(null, userObject);
        } catch (error) {
          return cb(error, false);
        }
      });
    },
  ),
);

passport.serializeUser((user, cb) => cb(null, user.id));

passport.deserializeUser((id, cb) => {
  Users.findOne({ where: { id } }, (err, user) => cb(err, user));
});

export { jwtStrategy, googleStrategy, facebookStrategy };
