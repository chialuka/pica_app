import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import dotenv from 'dotenv';
import { Users } from '../models';

dotenv.config();

const {
  HASH_SECRET,
  GOOGLE_ID,
  GOOGLE_SECRET,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
} = process.env;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: HASH_SECRET,
};

const jwtStrategy = passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    console.log(payload, 'jwt payload');
    Users.findOne({ where: { id: payload.id } })
      .then(user => done(null, user))
      .catch(error => done(error, false));
  }),
);

const googleStrategy = passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: 'http://localhost:2800/signin/google',
    },
    (accessToken, refreshToken, profile, cb) => {
      process.nextTick(() => {
        Users.findOne({ where: { googleId: profile.id } })
          .then((user) => {
            console.log(user);
          })
          .catch(err => console.log(err, 'err'));
      });
    },
  ),
);

const facebookStrategy = passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_ID,
      clientSecret: FACEBOOK_SECRET,
      callbackURL: 'http://localhost:2800/signin/facebook',
    },
    (accessToken, refreshToken, profile, cb) => {
      process.nextTick(() => {
        console.log(profile, 'facebook profile');
        Users.findOne({ where: { googleId: profile.id } })
          .then((user) => {
            console.log(user);
          })
          .catch(err => console.log(err, 'err'));
      });
    },
  ),
);

export { jwtStrategy, googleStrategy, facebookStrategy };
