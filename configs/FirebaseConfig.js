// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4kWs9LYwDZDYbVFpFO3e7rcybYnFJVkc",
  authDomain: "kineo-cdde7.firebaseapp.com",
  projectId: "kineo-cdde7",
  storageBucket: "kineo-cdde7.firebasestorage.app",
  messagingSenderId: "875739497924",
  appId: "1:875739497924:web:8060f77db5038629699091",
  measurementId: "G-4WHR0GVXC3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);