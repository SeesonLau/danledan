import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU6pu8Kq4oOSRep6tEp_41ZiPz6uV3Lps",
  authDomain: "opticare-firebase.firebaseapp.com",
  projectId: "opticare-firebase",
  storageBucket: "opticare-firebase.firebasestorage.app",
  messagingSenderId: "7823200320",
  appId: "1:7823200320:web:9ff0e25f3e22bf80d04fa5",
  measurementId: "G-J1PEB6SE72",
};

// init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const auth = getAuth();

//collection ref
const colRef = collection(db, "books");

//get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

//adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

//signing users up
//const signupForm = document.querySelector

// logging in
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth)
    .then((cred) => {
      console.log("user logged in: ", cred.user);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

export { db, auth };
