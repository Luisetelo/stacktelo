const jwt = require('jsonwebtoken');
const to = require('await-to-js').default;
const User = require('../../models/user');

const { jwtSecret } = require('../../config');

const withAuth = (req, res, callback) => {
  const { token } = req;
  if (!token) {
    res.sendStatus(401);
  } else {
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        const [userError, user] = await to(User.findById(decoded.userId));
        if (userError || !user) {
          console.error(userError);
          res.status(500).json({
            error: 'Internal error please try again',
          });
        } else {
          req.currentUser = user;
          callback();
        }
      }
    });
  }
};
module.exports = withAuth;
