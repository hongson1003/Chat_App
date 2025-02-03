import jwt from 'jsonwebtoken';

const signJwt = (data, secret, expiresIn) => {
  try {
    return jwt.sign({ data }, secret, { expiresIn });
  } catch (error) {
    throw error;
  }
};

const verify = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw error;
  }
};

const jwtHandler = {
  signJwt,
  verify,
};

export default jwtHandler;
