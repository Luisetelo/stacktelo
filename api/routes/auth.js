const to = require('await-to-js').default;
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { jwtSecret } = require('../../config');
const { withAuth } = require('../middlewares');

module.exports = (router) => {
  router.post('/api/auth/signup', async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    const [error] = await to(user.save());
    if (!error) {
      res.sendStatus(200);
    } else {
      console.error(error);
      res.status(500).json({ error: 'Error signing up' });
    }
  });

  router.post('/api/auth/signin', async (req, res) => {
    const { email, password } = req.body;
    const [userError, user] = await to(User.findOne({ email }));
    if (userError) {
      console.error(userError);
      res.status(500).json({
        error: 'Internal error please try again',
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password',
      });
    } else {
      const [matchError, match] = await to(user.isCorrectPassword(password));
      let token;
      switch (true) {
        case matchError:
          res.status(500).json({
            error: 'Internal error please try again',
          });
          break;
        case match:
          token = jwt.sign({ userId: user._id }, jwtSecret, {
            expiresIn: '1 week',
          });
          res.status(200).json({ token });
          break;
        default:
          break;
      }
    }
  });

  router.get('/api/auth/refresh', withAuth, async (req, res) => {
    const token = jwt.sign({ userId: req.currentUser._id }, jwtSecret, {
      expiresIn: '1 week',
    });
    res.status(200).json({ token });
  });
};
