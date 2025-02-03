import { authHandler, jwtHandler } from '@/utils';
import config from '@config';
import createHttpError from 'http-errors';
import { TokenExpiredError } from 'jsonwebtoken';

const { secret } = config.jwt;

const privateRoute = async (req, res, next) => {
  const headerToken = authHandler.extractToken(req);
  const { access_token } = req.cookies || {};
  const isWebRequest = req.headers['user-agent']?.includes('Mozilla');
  let errors = [];

  if (!headerToken && !access_token) {
    errors.push('Unauthorized: No token provided');
  }

  if (isWebRequest) {
    if (headerToken && access_token && headerToken !== access_token) {
      errors.push('Unauthorized: Token does not match');
    }
  } else {
    if (!headerToken) {
      errors.push('Unauthorized: No token provided');
    }
  }

  if (errors.length > 0) {
    return next(createHttpError(401, errors.join(', ')));
  }

  try {
    jwtHandler.verify(headerToken || access_token, secret);
    req.token = headerToken || access_token;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(createHttpError(401, 'Unauthorized: Token expired'));
    }
    next(error);
  }
};

const userGuardHandler = {
  privateRoute,
};

export default userGuardHandler;
