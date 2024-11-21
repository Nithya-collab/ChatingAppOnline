import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCyPgG1rnW8ySFc-Z9dYkPSHrIz9ElCqOk",
  authDomain: "firstfirebase-95c71.firebaseapp.com",
  projectId: "firstfirebase-95c71",
  storageBucket: "firstfirebase-95c71.appspot.com",
  messagingSenderId: "26761455290",
  appId: "1:26761455290:web:4486f534b9b6a3df628483",
  measurementId: "G-S5116LPPDZ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore and Auth services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// const GoogleAuth = firebase.auth.GoogleAuthProvider;
// const FbAuth = firebase.auth.FacebookAuthProvider;

export { db, auth };
