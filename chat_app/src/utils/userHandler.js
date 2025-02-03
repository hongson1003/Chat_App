import bcrypt from 'bcrypt';

const saltRounds = 10;

export const USER_RESPONSE_FIELDS = [
  'id',
  'fullName',
  'username',
  'phoneNumber',
  'avatar',
  'lastedOnline',
];

const PROFILE_RESPONSE_FIELDS = [
  'birthdate',
  'gender',
  'soundTrack',
  'coverImage',
  'description',
];

const authHandler = {
  hashPassword: (password) => {
    try {
      const salt = bcrypt.genSaltSync(saltRounds);
      return bcrypt.hashSync(password, salt);
    } catch (error) {
      throw error;
    }
  },

  checkPassword: (password, hashedPassword) => {
    try {
      return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
      throw error;
    }
  },

  toUserResponse: (user) => {
    if (!user) return null;

    const myUser = { ...user };

    if (myUser.avatar) {
      myUser.avatar = Buffer.from(myUser.avatar, 'base64').toString();
    }

    return Object.fromEntries(
      Object.entries(myUser).filter(([key]) =>
        USER_RESPONSE_FIELDS.includes(key)
      )
    );
  },

  standardProfile: (profile) => {
    try {
      return Object.fromEntries(
        Object.entries(profile).filter(([key]) => keyProfile.includes(key))
      );
    } catch (error) {
      throw error;
    }
  },

  generateRandomPassword: (length = 8) => {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  },
};

export default authHandler;
