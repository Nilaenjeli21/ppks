import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy, VerifyCallback } from 'passport-jwt';
import { UserService } from '../../services/UserService';

const configurePassport = (): void => {
  const jwtVerifyFunction: VerifyCallback = async (payload: JwtPayload, done) => {
    try {
      const userId = payload.id;
      const user = await UserService.getUserById(userId);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  };

  const jwtStrategy = new Strategy(
    {
      secretOrKey: process.env.APP_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    jwtVerifyFunction
  );

  passport.use('jwt', jwtStrategy);
};

export default configurePassport;

export const Authentication = {
  AUTHENTICATED: passport.authenticate('jwt', { session: false, failWithError: true }),
};
