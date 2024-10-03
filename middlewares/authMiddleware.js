const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    return res.status(401).send('No token provided');
  }
};

module.exports = authMiddleware;
