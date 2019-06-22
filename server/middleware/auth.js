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

/**
 * @socialLogin
 * @description Generic function to handle social requests
 * @param {Function} cb Callback function to be invoked
 * @param {Object} profile Object containing user details
 */
const socialLogin = (cb, profile) => {
  process.nextTick(async () => {
    try {
      console.log(profile, 'profile');
      let user = await Users.findOne({
        where: { email: profile.emails[0].value },
      });
      if (!user) {
        const newUser = {
          userName: profile.userName,
          email: profile.emails[0].value,
        };
        user = await Users.create(newUser);
      }
      const token = generateToken(user.id);
      user.token = token;
      return cb(null, user);
    } catch (error) {
      console.error(error, 'error');
      return cb(error, false);
    }
  });
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
      socialLogin(cb, profile);
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
    (accessToken, refreshToken, profile, cb) => socialLogin(cb, profile),
  ),
);

passport.serializeUser((user, cb) => cb(null, user.id));

passport.deserializeUser((id, cb) => {
  Users.findOne({ where: { id } }, user => cb(user, null));
});

export { jwtStrategy, googleStrategy, facebookStrategy };
