import { admin, db } from '@/configs';
import { authHandler, jwtHandler, stringHandler, userHandler } from '@/utils';
import config from '@config';
import createHttpError from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

const { secret, expiresIn } = config.jwt;

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
    expiresIn
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

const verifyUser = async (id, phoneNumber) => {
  try {
    const userRaw = await db.User.findOne({
      where: {
        id: id,
        phoneNumber: phoneNumber,
      },
      raw: false,
    });
    let user = userHandler.toUserResponse(userRaw?.dataValues);
    if (Object.keys(user).length !== 0) {
      const deletedAvatar = { ...user };
      delete deletedAvatar.avatar;
      let accessToken = jwtHandler.signJwt(deletedAvatar, secret, expiresIn);
      let refreshToken = uuidv4();
      userRaw.refreshToken = refreshToken;
      userRaw.lastedOnline = null;
      await userRaw.save();
      return {
        errCode: 0,
        message: 'Verify user success',
        data: {
          user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
    }
    return {
      errCode: 1,
      message: 'Verify fail, Please check your code !',
    };
  } catch (error) {
    throw error;
  }
};

const login = async (phoneNumber, password) => {
  try {
    let userDB = await db.User.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
    if (userDB) {
      const user = userHandler.toUserResponse(userDB);
      let checkPassword = userHandler.checkPassword(password, userDB.password);
      if (checkPassword) return user;
      throw createHttpError(400, 'Password not correct');
    } else throw createHttpError(400, 'User not found');
  } catch (error) {
    throw error;
  }
};

const updateToken = async (refresh_token_old) => {
  try {
    let userRaw = await db.User.findOne({
      where: {
        refreshToken: refresh_token_old,
      },
      raw: false,
    });
    const user = userRaw?.dataValues;
    if (user) {
      const refreshToken = uuidv4();
      const userClient = userHandler.toUserResponse(user);
      const deletedAvatar = { ...userClient };
      delete deletedAvatar.avatar;
      const token = jwtHandler.signJwt(deletedAvatar, secret, expiresIn);
      userRaw.refreshToken = refreshToken;
      userRaw.lastedOnline = null;
      await userRaw.save();
      return {
        errCode: 100,
        message: 'Refresh token success',
        data: {
          user: userClient,
          refreshToken: refreshToken,
          accessToken: token,
        },
      };
    } else {
      return {
        errCode: 1,
        message: 'Refresh token fail, Please check !',
      };
    }
  } catch (error) {
    throw error;
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
  verifyUser,
  login,
  updateToken,
  updatePassword,
  changePassword,
  verifyIdToken,
};

export default authService;
