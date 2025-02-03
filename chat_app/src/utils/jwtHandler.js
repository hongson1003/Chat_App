import jwt from 'jsonwebtoken';

const jwtHandler = {
  signJwt: (data, secret, expiresIn) => {
    try {
      return jwt.sign({ data }, secret, { expiresIn });
    } catch (error) {
      throw error;
    }
  },

  verify: (token, secret) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw error;
    }
  },

  extractToken: (req) => {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
      ) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },
};

export default jwtHandler;
