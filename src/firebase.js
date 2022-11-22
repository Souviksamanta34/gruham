import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfZ30HJxmKS6fNR_5_vtw0kYzPHR34Tbw",
  authDomain: "gruham-50c06.firebaseapp.com",
  databaseURL: "https://gruham-50c06-default-rtdb.firebaseio.com",
  projectId: "gruham-50c06",
  storageBucket: "gruham-50c06.appspot.com",
  messagingSenderId: "721484480473",
  appId: "1:721484480473:web:0d8123c80e43b1a5d463c8",
  measurementId: "G-JTL8HSHXPW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };