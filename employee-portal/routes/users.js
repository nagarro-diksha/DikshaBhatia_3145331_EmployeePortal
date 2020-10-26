var express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

var router = express.Router();

/* GET users listing. */
router.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});


/* POST user sign-up*/
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    return res.render('pages/about')
  }
);

/* POST user login*/
router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);
              console.log(user);
              const body = { _id: user._id, username: user.username, password: user.password };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');
              return res.render('pages/about');
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);


module.exports = router;
