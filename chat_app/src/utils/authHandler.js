import { appRegex } from '@/constants';

const REGISTER_USER_FIELDS = ['phoneNumber', 'password', 'fullName', 'idToken'];

const LOGIN_USER_FIELDS = ['username', 'password'];

const getRegisterFieldsNotValid = (data) => {
  const fieldsNotValid = REGISTER_USER_FIELDS.filter((field) => !data[field]);
  if (fieldsNotValid.length) return fieldsNotValid;
  return null;
};

const checkPhoneNumberIsValid = (phoneNumber) => {
  return appRegex.PHONE_NUMBER.test(phoneNumber);
};

const authHandler = {
  getRegisterFieldsNotValid,
  checkPhoneNumberIsValid,
};

export default authHandler;
