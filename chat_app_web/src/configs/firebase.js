import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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
export const auth = getAuth(app);
