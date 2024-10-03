// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5o3SBkvA_-MBNqwkPLGlmcmYQWAlZUj8",
  authDomain: "gruham-eb94a.firebaseapp.com",
  projectId: "gruham-eb94a",
  storageBucket: "gruham-eb94a.appspot.com",
  messagingSenderId: "607624346585",
  appId: "1:607624346585:web:d63974c9d262d79376b7c8",
  measurementId: "G-DPRH81RTJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };