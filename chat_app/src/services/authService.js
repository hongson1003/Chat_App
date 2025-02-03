import { admin, db } from '@/configs';
import { authHandler, jwtHandler, stringHandler, userHandler } from '@/utils';
import config from '@config';
import createHttpError from 'http-errors';

const { secret, expiresIn, maxAge } = config.jwt;

const verifyIdToken = async (idToken) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  return decodedToken;
};

const register = async ({ fullName, phoneNumber, password, idToken }) => {
  let userExists = await db.User.findOne({
    where: {
      phoneNumber,
    },
  });

  if (userExists)
    throw createHttpError(400, 'User already exists, please login');

  const tokenExtracted = await verifyIdToken(idToken);

  if (
    tokenExtracted.phone_number !==
    stringHandler.convertPhoneViToInternational(phoneNumber)
  ) {
    throw createHttpError(400, 'Phone number not match');
  }

  const user = await db.User.create({
    fullName,
    phoneNumber,
    password,
  });

  let accessToken = jwtHandler.signJwt(
    {
      phoneNumber,
      fullName,
    },
    secret,
    expiresIn
  );

  let refreshToken = jwtHandler.signJwt(
    {
      phoneNumber,
      fullName,
    },
    secret,
    maxAge
  );

  await db.RefreshToken.update(
    {
      isActive: false,
    },
    {
      where: {
        userId: user.id,
        isActive: true,
      },
    }
  );

  await db.RefreshToken.create({
    userId: user.id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + maxAge * 1000),
  });

  await db.ProfileContact.create({
    userId: user.id,
  });

  return authHandler.toUserResponse({
    ...user.dataValues,
    accessToken,
    refreshToken,
  });
};

const login = async (username, password) => {
  let user = await db.User.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    throw createHttpError(400, 'User not found');
  }

  let checkPassword = userHandler.checkPassword(password, user.password);
  if (!checkPassword) {
    throw createHttpError(400, 'Password not match');
  }

  const accessToken = jwtHandler.signJwt(
    {
      username,
    },
    secret,
    expiresIn * 1000
  );

  const refreshToken = jwtHandler.signJwt(
    {
      username,
    },
    secret,
    maxAge * 1000
  );

  await db.RefreshToken.update(
    {
      isActive: false,
    },
    {
      where: {
        userId: user.id,
        isActive: true,
      },
    }
  );

  await db.RefreshToken.create({
    userId: user.id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + maxAge * 1000),
  });

  const response = authHandler.toUserResponse({
    ...user,
    accessToken,
    refreshToken,
  });

  return response;
};

const extractToken = async (token) => {
  const decodedToken = jwtHandler.verify(token, secret);
  const { username, phoneNumber } = decodedToken.data;

  const user = await db.User.findOne({
    where: {
      username: username || phoneNumber,
    },
  });

  const response = userHandler.toUserResponse(user);

  return response;
};

const updateToken = async (refresh_token_old) => {
  const decoded = jwtHandler.verify(refresh_token_old, secret);

  let user = await db.User.findOne({
    where: {
      username: decoded.data.username,
    },
  });

  if (!user) {
    throw createHttpError(400, 'User not found');
  }

  const refreshTokenExists = await db.RefreshToken.findOne({
    where: {
      token: refresh_token_old,
      isActive: false,
    },
  });

  if (refreshTokenExists) {
    throw createHttpError(403, 'Refresh token is invalid');
  }

  const accessToken = jwtHandler.signJwt(
    {
      username: user.username,
    },
    secret,
    expiresIn * 1000
  );

  const refreshToken = jwtHandler.signJwt(
    {
      username: user.username,
    },
    secret,
    maxAge * 1000
  );

  await db.RefreshToken.update(
    {
      isActive: false,
    },
    {
      where: {
        userId: user.id,
        isActive: true,
      },
    }
  );

  await db.RefreshToken.create({
    userId: user.id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + maxAge * 1000),
  });

  const response = authHandler.toUserResponse({
    ...user,
    accessToken,
    refreshToken,
  });

  return response;
};

const authService = {
  register,
  login,
  extractToken,
  updateToken,
  verifyIdToken,
  updateToken,
};

export default authService;
