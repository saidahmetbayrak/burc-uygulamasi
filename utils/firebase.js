import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0qWAPEFODuxB8cHmvd_KdOx6Z2te6WA8",
  authDomain: "burcapp-68a1c.firebaseapp.com",
  projectId: "burcapp-68a1c",
  storageBucket: "burcapp-68a1c.appspot.com",
  messagingSenderId: "810504493009",
  appId: "1:810504493009:web:9a0ce75a2d8d993c4232f0",
  measurementId: "G-Z3QBL8WV1B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with appropriate persistence based on platform
let auth;

if (Platform.OS === 'web') {
  // Use browser persistence for web platform
  auth = getAuth(app);
} else {
  // Use AsyncStorage persistence for native platforms
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
}

// Authentication functions
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { auth };
