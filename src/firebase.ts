// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4-GC5zj85uFqZ-Ywvze0rF01l8HJZNIM",
  authDomain: "tazeez-73b4f.firebaseapp.com",
  projectId: "tazeez-73b4f",
  storageBucket: "tazeez-73b4f.firebasestorage.app",
  messagingSenderId: "802614142359",
  appId: "1:802614142359:web:34139a82818e3fc18210d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
