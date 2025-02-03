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

  if (user) {
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

    const response = authHandler.toUserResponse({
      ...user,
      accessToken,
      refreshToken,
    });

    return response;
  } else {
    throw createHttpError(400, 'User not found');
  }
};

const updatePassword = async (id, phoneNumber, password) => {
  try {
    let userDB = await db.User.findOne({
      where: {
        phoneNumber: phoneNumber,
        id: id,
      },
      raw: false,
    });
    if (userDB) {
      userDB.password = userHandler.hashPassword(password);
      await userDB.save();
      const user = userHandler.toUserResponse(userDB.dataValues);
      return {
        errCode: 0,
        message: 'Update password success',
        user: user,
      };
    } else {
      return {
        errCode: 2,
        message: 'Fail, First, please register account',
      };
    }
  } catch (error) {
    throw error;
  }
};

const changePassword = async (id, oldPassword, newPassword) => {
  try {
    let userDB = await db.User.findOne({
      where: {
        id: id,
      },
      raw: false,
    });
    if (userDB) {
      let checkPassword = userHandler.checkPassword(
        oldPassword,
        userDB.password
      );
      if (checkPassword) {
        userDB.password = userHandler.hashPassword(newPassword);
        await userDB.save();
        const user = userHandler.toUserResponse(userDB.dataValues);
        return {
          errCode: 0,
          message: 'Change password success',
          user: user,
        };
      }
      return {
        errCode: 3,
        message: 'Not equal password for user. Please check !',
      };
    } else {
      return {
        errCode: 2,
        message: 'Fail, First, please register account',
      };
    }
  } catch (error) {
    throw error;
  }
};

const authService = {
  register,
  login,
  extractToken,
  updateToken,
  updatePassword,
  changePassword,
  verifyIdToken,
  updateToken,
};

export default authService;
