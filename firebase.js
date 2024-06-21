// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMN2nPwtbZX7ioa5p42R2pLbKTWujV1vs",
  authDomain: "bclics.firebaseapp.com",
  projectId: "bclics",
  storageBucket: "bclics.appspot.com",
  messagingSenderId: "365682569155",
  appId: "1:365682569155:web:46c6373d1639301e1f9776",
  measurementId: "G-K8PP4RD1G6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
// Initialize Cloud Firestore and get a reference to the service
