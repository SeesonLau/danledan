import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
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
  //storageBucket: "opticare-firebase.firebasestorage.app",
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

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    throw err;
  }
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

    const roleDoc = await getDoc(
      doc(db, selectedRole === "clinic" ? "patients" : "clinics", user.uid)
    );
    const userInfo = roleDoc.data();

    if (!lowerUserRoles.includes(selectedRole)) {
      return {
        success: false,
        userData: userInfo,
        role: selectedRole,
        uid: user.uid,
      };
    }

    return { success: true, userType }; // Return the selected role for routing
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
    // Sign in with Google
    const userCredential = await signInWithPopup(auth, googleProvider);
    if (!userCredential) {
      throw new Error("Authentication failed. Please try again.");
    }

    const user = userCredential.user;
    if (!user || !user.email) {
      throw new Error("Invalid user data. Please try again.");
    }

    // Check if user exists in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

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

    const roleDoc = await getDoc(
      doc(db, selectedRole === "clinic" ? "patients" : "clinics", user.uid)
    );
    const userInfo = roleDoc.data();

    if (!lowerUserRoles.includes(selectedRole)) {
      return {
        success: false,
        userData: userInfo,
        role: selectedRole,
        uid: user.uid,
      };
    }

    return { success: true, userType }; // Return the selected role for routing
  } catch (error) {
    if (
      error.code === "auth/cancelled-popup-request" ||
      error.code === "auth/popup-closed-by-user"
    ) {
      console.warn("User closed the popup before completing sign-in.");
      auth.signOut();
      //alert("Google sign-in was canceled. Please try again.");
      //googleProvider = new GoogleAuthProvider();
      return null;
    }
    console.error("Google Login Error:", error);
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
  licenseNumber = null,
  isSecondRole = false,
  uid
) => {
  try {
    //for Second Role
    if (isSecondRole) {
      alert("1");
      const userData = { email, firstName, lastName };
      const secondAccount = await addSecondRole(
        uid,
        userData,
        role,
        role === "Clinic" ? licenseNumber : null
      );
      alert(secondAccount.success);
      return { success: secondAccount.success, message: secondAccount.message };
    }
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

export const addSecondRole = async (uid, userData, userType, licenseNumber) => {
  if (!uid || !userData || !userType) {
    throw new Error("Missing required parameters");
  }

  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User does not exist");
    }

    let existingRole = userSnap.data().role;

    if (!existingRole) {
      existingRole = [];
    } else if (typeof existingRole === "string") {
      existingRole = [existingRole]; // Convert string to array
    }

    // Update the role field to ensure it keeps the original value
    await updateDoc(userRef, {
      role: arrayUnion(...existingRole, userType), // Ensure all roles are kept
    });

    // Define collection name based on userType
    const collectionName = userType === "Clinic" ? "clinics" : "patients";
    const roleRef = doc(db, collectionName, uid);

    // Create a new document in the role collection
    const newUserData = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    if (userType === "Clinic" && licenseNumber) {
      newUserData.licenseNumber = licenseNumber;
    }

    await setDoc(roleRef, newUserData);

    return { success: true, message: `You now have ${userType} account.` };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const registerWithGoogle = async (role, licenseNumber = null) => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Extract user details
    const { displayName, email, uid } = user;
    const [firstName, ...lastNameArray] = displayName.split(" ");
    const lastName = lastNameArray.join(" ") || "";

    // Save user details in "users" collection
    await setDoc(doc(db, "users", uid), {
      email,
      role,
    });

    // Determine the collection based on role
    const roleCollection = role === "Patient" ? "patients" : "clinics";

    // Prepare user data
    const userData = {
      firstName,
      lastName,
      email,
    };

    if (role === "Clinic") {
      userData.licenseNumber = licenseNumber; // Add licenseNumber for clinics
    }

    // Save user details in role-specific collection
    await setDoc(doc(db, roleCollection, uid), userData);

    return {
      success: true,
      message: "Google sign-in successful!",
      userData,
      uid,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateUserInfo = async (uid, userType, licenseNumber) => {
  try {
    if (userType !== "Clinic") {
      return {
        success: false,
        message: "Only Clinic users can have a license number.",
      };
    }

    const clinicRef = doc(db, "clinics", uid);

    await updateDoc(clinicRef, {
      licenseNumber: licenseNumber,
    });

    return { success: true, message: "License number updated successfully!" };
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
      const firstName = userData?.firstName?.trim() || "Unknown";
      const lastName =
        userData?.lastName?.trim() ||
        (userType === "Clinic" ? "Doctor" : "Patient");

      return `${firstName} ${lastName}`;
    } else {
      //throw new Error("User data not found.");
    }
  } catch (error) {
    console.error("Error fetching user name:", error);
    return userType === "Clinic" ? "Unknown Doctor" : "Unknown Patient";
  }
};
