const REGISTER_USER_FIELDS = ['phoneNumber', 'password', 'name', 'idToken'];

const LOGIN_USER_FIELDS = ['username', 'password'];

const checkRegisterFields = (data) => {
  const keys = Object.keys(data);
  return REGISTER_USER_FIELDS.every((field) => keys.includes(field));
};

const authHandler = {
  checkRegisterFields,
};

export default authHandler;
