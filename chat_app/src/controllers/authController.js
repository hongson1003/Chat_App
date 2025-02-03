import { authService, userService } from '@/services';
import { authHandler, jwtHandler } from '@/utils';
import {
  default as createError,
  default as createHttpError,
} from 'http-errors';
import { TokenExpiredError } from 'jsonwebtoken';

const register = async (req, res, next) => {
  let data = req.body;
  const fieldsNotValid = authHandler.getRegisterFieldsNotValid(data);

  if (fieldsNotValid) {
    const fields = fieldsNotValid.join(', ');
    const error = createError(400, `Missing required fields: ${fields}`);
    return next(error);
  }
  const phoneNumberIsValid = authHandler.checkPhoneNumberIsValid(
    data.phoneNumber
  );
  if (!phoneNumberIsValid) {
    const error = createError(400, 'Phone number is not valid');
    return next(error);
  }

  try {
    const response = await authService.register(data);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  const { id, phoneNumber } = req.body;
  try {
    let rs = await authService.verifyUser(id, phoneNumber);
    if (rs.errCode === 0) {
      res.cookie('access_token', rs.data.access_token, {
        httpOnly: true,
        maxAge: +MAX_AGE * 60000,
      });
      res.cookie('refresh_token', rs.data.refresh_token, {
        httpOnly: true,
        maxAge: +MAX_AGE * 60000,
      });
    }
    return res.status(200).json(rs);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  let data = req.body;

  const fieldsNotValid = authHandler.getLoginFieldsNotValid(data);

  if (fieldsNotValid) {
    const fields = fieldsNotValid.join(', ');
    const error = createError(400, `Missing required fields: ${fields}`);
    return next(error);
  }

  try {
    let rs = await authService.login(phoneNumber, password);
    return res.status(200).json(rs);
  } catch (error) {
    next(error);
  }
};

const check = async (req, res, next) => {
  let access_token = req.cookies['access_token'];
  const refresh_token = req.cookies['refresh_token'];
  if (!refresh_token || !access_token)
    return res.status(200).json({
      errCode: 1,
      message: 'No refresh_token & access_token',
    });
  try {
    let decoded = jwtHandler.verify(access_token, SECRET);
    const userDecoded = decoded?.data;
    const userRes = await userService.getUserById(userDecoded.id);
    return res.status(200).json({
      errCode: 0,
      data: {
        user: userRes.data,
        access_token,
        refresh_token,
      },
    });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // refresh token
      const rs = await authService.updateToken(refresh_token);
      if (rs.errCode === 100) {
        res.cookie('access_token', rs.data.access_token, {
          httpOnly: true,
          maxAge: +MAX_AGE * 60000,
        });
        res.cookie('refresh_token', rs.data.refresh_token, {
          httpOnly: true,
          maxAge: +MAX_AGE * 60000,
        });
      }
      return res.status(200).json(rs);
    }
    next(error);
  }
};

const logout = async (req, res, next) => {
  let access_token = req.cookies['access_token'];
  const refresh_token = req.cookies['refresh_token'];
  if (!refresh_token || !access_token)
    return res.status(200).json({
      errCode: 1,
      messag: 'No refresh_token & access_token',
    });
  try {
    res.clearCookie('refresh_token');
    res.clearCookie('access_token');
    return res.status(200).json({
      errCode: 0,
      message: 'Logout user success',
      data: null,
    });
  } catch (error) {
    next();
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { id, phoneNumber, newPassword } = req.body;
    if (!newPassword || !phoneNumber || !id)
      return res.status(200).json({
        errCode: 1,
        message: 'Missing parameter',
      });
    let rs = await authService.updatePassword(id, phoneNumber, newPassword);
    return res.status(200).json(rs);
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const id = req.user.id;
    if (!newPassword || !oldPassword || !id)
      return res.status(200).json({
        errCode: 1,
        message: 'Missing parameter',
      });
    let rs = await authService.changePassword(id, oldPassword, newPassword);
    return res.status(200).json(rs);
  } catch (error) {
    next(error);
  }
};

const verifyIdToken = async (req, res, next) => {
  const { idToken } = req.query;
  if (!idToken)
    throw new createHttpError(400, 'Missing required parameter: idToken');
  try {
    let rs = await authService.verifyIdToken(idToken);
    return res.status(200).json(rs);
  } catch (error) {
    next(error);
  }
};

const authController = {
  register,
  verifyUser,
  login,
  check,
  logout,
  resetPassword,
  changePassword,
  verifyIdToken,
};

export default authController;
