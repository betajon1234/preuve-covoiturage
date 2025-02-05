const passport = require('passport');

const jwtUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, next);
};

module.exports = jwtUser;
