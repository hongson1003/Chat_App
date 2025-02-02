import { initializeApp } from 'firebase/app';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { configEnvs } from './env';

const firebaseConfig = {
  apiKey: configEnvs.FIREBASE.API_KEY,
  authDomain: configEnvs.FIREBASE.AUTH_DOMAIN,
  projectId: configEnvs.FIREBASE.PROJECT_ID,
  storageBucket: configEnvs.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: configEnvs.FIREBASE.MESSAGING_SENDER_ID,
  appId: configEnvs.FIREBASE.APP_ID,
  measurementId: configEnvs.FIREBASE.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

const setupRecaptcha = (elementId) => {
  try {
    window.recaptchaVerifier = new RecaptchaVerifier(
      elementId,
      {
        callback: (response) => {
          console.log('reCAPTCHA solved:', response);
        },
      },
      auth
    );
  } catch (error) {
    console.log(error);
  }
};

const sendOTP = async (phoneNumber, elementId, onSuccess, onFail, onFinish) => {
  setupRecaptcha(elementId);
  let appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      onSuccess(confirmationResult);
    })
    .catch((error) => {
      // Error; SMS not sent
      onFail(error);
    })
    .finally(() => {
      onFinish();
    });
};

const verifyOTP = async (otp, onSuccess, onFail, onFinish) => {
  let confirmationResult = window.confirmationResult;
  confirmationResult
    .confirm(otp)
    .then(async (result) => {
      onSuccess(result);
    })
    .catch((error) => {
      onFail(error);
    })
    .finally(() => {
      onFinish();
    });
};

export { auth, sendOTP, verifyOTP };
