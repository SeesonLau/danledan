import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAU6pu8Kq4oOSRep6tEp_41ZiPz6uV3Lps",
  authDomain: "opticare-firebase.firebaseapp.com",
  databaseURL:
    "https://opticare-firebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "opticare-firebase",
  storageBucket: "opticare-firebase.firebasestorage.app",
  messagingSenderId: "7823200320",
  appId: "1:7823200320:web:9ff0e25f3e22bf80d04fa5",
  measurementId: "G-J1PEB6SE72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider };

//for login
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
