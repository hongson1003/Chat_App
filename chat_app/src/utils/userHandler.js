import bcrypt from 'bcrypt';

const saltRounds = 10;

const keyUserRegister = [
  'id',
  'phoneNumber',
  'userName',
  'avatar',
  'lastedOnline',
];
const keyProfile = [
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

  standardUser: (user) => {
    if (!user) return null;

    try {
      const myUser = { ...user };

      if (myUser.avatar) {
        myUser.avatar = Buffer.from(myUser.avatar, 'base64').toString();
      }

      return Object.fromEntries(
        Object.entries(myUser).filter(([key]) => keyUserRegister.includes(key))
      );
    } catch (error) {
      throw error;
    }
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
};

export default authHandler;
