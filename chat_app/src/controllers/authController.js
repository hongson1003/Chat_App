import { authService } from '@/services';
import { authHandler } from '@/utils';
import config from '@config';
import {
  default as createError,
  default as createHttpError,
} from 'http-errors';

const { maxAge } = config.jwt;

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

    res.cookie('access_token', response.accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.cookie('refresh_token', response.refreshToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  let data = req.body;
  const { username, password } = data;

  const fieldsNotValid = authHandler.getLoginFieldsNotValid(data);

  if (fieldsNotValid) {
    const fields = fieldsNotValid.join(', ');
    const error = createError(400, `Missing required fields: ${fields}`);
    return next(error);
  }

  try {
    let response = await authService.login(username, password);

    res.cookie('access_token', response.accessToken, {
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.cookie('refresh_token', response.refreshToken, {
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log('🚀 ~ login ~ error:', error);
    next(error);
  }
};

const extractToken = async (req, res, next) => {
  const token = req.cookies['access_token'];
  const refreshToken = req.cookies['refresh_token'];
  try {
    const user = await authService.extractToken(token);
    return res.status(200).json({
      ...user,
      accessToken: token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  let access_token = req.cookies['access_token'];
  const refresh_token = req.cookies['refresh_token'];
  if (!access_token || !refresh_token) {
    const error = createError(400, 'Missing required cookies');
    return next(error);
  }
  res.clearCookie('refresh_token');
  res.clearCookie('access_token');
  return res.status(200).json({ message: 'Logout successfully' });
};

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    const error = createError(400, 'Missing required cookies');
    return next(error);
  }
  try {
    const response = await authService.updateToken(refreshToken);

    res.cookie('access_token', response.accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.cookie('refresh_token', response.refreshToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const qrLogin = async (req, res, next) => {
  const { accessToken, idToken } = req.body;
  if (!accessToken || !idToken) {
    const error = createError(400, 'Missing required parameters');
    return next(error);
  }

  try {
    const response = await authService.verifyQrLogin(accessToken, idToken);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.cookie('refresh_token', response.refreshToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { phoneNumber, idToken } = req.body;

  if (!phoneNumber) {
    const error = createError(400, 'Missing required parameters');
    return next(error);
  }

  try {
    const response = await authService.forgotPassword(phoneNumber, idToken);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const authController = {
  register,
  login,
  extractToken,
  logout,
  verifyIdToken,
  refreshToken,
  qrLogin,
  forgotPassword,
};

export default authController;
