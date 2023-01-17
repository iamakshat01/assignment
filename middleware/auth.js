const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        next({
            status: 401,
            message: 'Please Sign In'
        });
      } else {
        next();
      }
    });
  } else {
        next({
            status: 401,
            message: 'Please Sign In or Register'
        });
  }
};