// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB26NAMtby1i6Dh9CePzUghEB8YQ7DjZd4",
  authDomain: "financedemo-47071.firebaseapp.com",
  projectId: "financedemo-47071",
  storageBucket: "financedemo-47071.appspot.com",
  messagingSenderId: "826775892878",
  appId: "1:826775892878:web:74d2002270c6a45680aadf",
  measurementId: "G-845Y0VLVP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();
export default app;