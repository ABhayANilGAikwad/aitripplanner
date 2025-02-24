// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore}  from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0AxJgHLF-RLdQ7xx55Ez2tQVHOTOlDLQ",
  authDomain: "trip-planner-9b6da.firebaseapp.com",
  projectId: "trip-planner-9b6da",
  storageBucket: "trip-planner-9b6da.firebasestorage.app",
  messagingSenderId: "889414697345",
  appId: "1:889414697345:web:025c8770c5881ab1666880",
  measurementId: "G-8W1ZKW4W3V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db=getFirestore(app);