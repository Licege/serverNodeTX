const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../../config/keys');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
};

module.exports = passport => {
  passport.use('simple-jwt',
    new JwtStrategy(options, async (payload, done) => {
      try {
        done(null, payload.userId);
        /*const user = await User.findById(payload.userId).select('email id')

        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }*/
      } catch (e) {
        console.log(e);
      }
    })
  );
};