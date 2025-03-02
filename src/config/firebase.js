import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

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
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  db,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  getDoc,
  doc,
  setDoc,
};

//for login
export const loginWithEmail = async (email, password, userType) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Fetch user role(s) from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      throw new Error("User data not found.");
    }

    const userData = userDoc.data();

    // Ensure userRoles is always an array (handles both single role and multiple roles)
    const userRoles = Array.isArray(userData.role)
      ? userData.role
      : [userData.role];

    // Convert both stored roles and selected role to lowercase for case-insensitive comparison
    const lowerUserRoles = userRoles.map((role) => role.toLowerCase());
    const selectedRole = userType.toLowerCase();

    if (!lowerUserRoles.includes(selectedRole)) {
      throw new Error(
        `You do not have a "${userType}" profile. Please select the correct role.`
      );
    }

    return userType; // Return the selected role for routing
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      throw new Error("User does not exist.");
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Incorrect password.");
    } else {
      throw error; // Other Firebase errors
    }
  }
};

export const loginWithGoogle = async (userType) => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Check if user exists in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error("User data not found. Please register first.");
    }

    const userData = userDoc.data();
    const userRoles = Array.isArray(userData.role)
      ? userData.role
      : [userData.role];

    if (
      !userRoles
        .map((role) => role.toLowerCase())
        .includes(userType.toLowerCase())
    ) {
      throw new Error(
        `You do not have a "${userType}" profile. Please select the correct role.`
      );
    }

    return userType; // Return the role for navigation
  } catch (error) {
    throw error;
  }
};

//for signup
export const registerWithEmail = async (
  firstName,
  lastName,
  email,
  password,
  role,
  licenseNumber = null
) => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user details in "users" collection
    await setDoc(doc(db, "users", user.uid), {
      email,
      role,
    });

    // Determine the collection based on role
    const roleCollection = role === "Patient" ? "patients" : "clinics";

    // Clinic users need to store the licenseNumber
    const userData = {
      firstName,
      lastName,
      email,
    };

    if (role === "Clinic") {
      userData.licenseNumber = licenseNumber; // Add licenseNumber for clinics
    }

    // Save user details in role-specific collection
    await setDoc(doc(db, roleCollection, user.uid), userData);

    return { success: true, message: "Registration successful!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//read functions
export const getFullName = async (userId, userType) => {
  try {
    if (!userId) throw new Error("No user ID provided.");
    if (!userType) throw new Error("User type is required.");

    // Determine the collection based on user type
    const collection = userType === "Clinic" ? "clinics" : "patients";
    const userRef = doc(db, collection, userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const firstName = userData.firstName?.trim() || "Unknown";
      const lastName =
        userData.lastName?.trim() ||
        (userType === "Clinic" ? "Doctor" : "Patient");

      return `${firstName} ${lastName}`;
    } else {
      throw new Error("User data not found.");
    }
  } catch (error) {
    console.error("Error fetching user name:", error);
    return userType === "Clinic" ? "Unknown Doctor" : "Unknown Patient";
  }
};
