// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "tour-management-673b4.firebaseapp.com",
  projectId: "tour-management-673b4",
  storageBucket: "tour-management-673b4.appspot.com",
  messagingSenderId: "851967878588",
  appId: "1:851967878588:web:84eff3f1cc52b5a45ef7b9",
  measurementId: "G-PVTQTK37N1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;