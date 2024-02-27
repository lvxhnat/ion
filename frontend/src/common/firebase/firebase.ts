// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBzVjVqiMNlaw-LmGBtWAkXzx1xWvXipo",
  authDomain: "finflow-7e642.firebaseapp.com",
  projectId: "finflow-7e642",
  storageBucket: "finflow-7e642.appspot.com",
  messagingSenderId: "186707564387",
  appId: "1:186707564387:web:80f82931c1022158f32556",
  measurementId: "G-XJ4VEZS369",
};

const provider = new GoogleAuthProvider();
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
