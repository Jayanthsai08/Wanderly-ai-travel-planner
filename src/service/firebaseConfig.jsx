// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAwy8Ve2TW_mI9St3HI8VAiP4KfohM4Cg",
  authDomain: "ai-travel-planner-1dead.firebaseapp.com",
  projectId: "ai-travel-planner-1dead",
  storageBucket: "ai-travel-planner-1dead.appspot.com",
  messagingSenderId: "168671185316",
  appId: "1:168671185316:web:f020ae45203dfa87305931",
  measurementId: "G-7SC3BXZXVV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);