const jwt = require('jsonwebtoken');

const checkToken = () => {
  return async (req, res, next) => {
    try {
      const BearerToken = req.headers.authorization;
      //   console.log(BearerToken);
      if (!BearerToken) {
        return res.status(401).json({ message: 'you are not authorized' });
      }
      const token = BearerToken.split(' ')[1];

      const isValid = jwt.verify(token, process.env.SECRET_KEY);
      if (!isValid) {
        return res.status(401).json({ message: 'you are not authorized' });
      }
      //   console.log(isValid);
      req.user = isValid;
      next();
    } catch (e) {
      console.log(e.message);
      return res.status(401).json({ message: 'you are not authorized' });
    }
  };
};

module.exports = checkToken;
