// Import Firebase dependencies from compat
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5o3SBkvA_-MBNqwkPLGlmcmYQWAlZUj8",
  authDomain: "gruham-eb94a.firebaseapp.com",
  projectId: "gruham-eb94a",
  storageBucket: "gruham-eb94a.appspot.com",
  messagingSenderId: "607624346585",
  appId: "1:607624346585:web:d63974c9d262d79376b7c8",
  measurementId: "G-DPRH81RTJ7"
};

// Initialize Firebase using compat
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize services
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Optionally, you can add analytics like this if needed, but it's not required
// const analytics = firebaseApp.analytics();

export { auth, db, provider };
