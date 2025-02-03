import { appRegex } from '@/constants';
import { USER_RESPONSE_FIELDS } from '.';

const REGISTER_USER_FIELDS = ['phoneNumber', 'password', 'fullName', 'idToken'];

const LOGIN_USER_FIELDS = ['username', 'password'];

const USER_AUTH_RESPONSE = USER_RESPONSE_FIELDS.concat([
  'accessToken',
  'refreshToken',
]);

const getRegisterFieldsNotValid = (data) => {
  const fieldsNotValid = REGISTER_USER_FIELDS.filter((field) => !data[field]);
  if (fieldsNotValid.length) return fieldsNotValid;
  return null;
};

const checkPhoneNumberIsValid = (phoneNumber) => {
  return appRegex.PHONE_NUMBER.test(phoneNumber);
};

const getLoginFieldsNotValid = (data) => {
  const fieldsNotValid = LOGIN_USER_FIELDS.filter((field) => !data[field]);
  if (fieldsNotValid.length) return fieldsNotValid;
  return null;
};

const toUserResponse = (user) => {
  const response = {};
  USER_AUTH_RESPONSE.forEach((field) => {
    response[field] = user[field];
  });

  return response;
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

const authHandler = {
  getRegisterFieldsNotValid,
  checkPhoneNumberIsValid,
  getLoginFieldsNotValid,
  toUserResponse,
  extractToken,
};

export default authHandler;
