import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC4-GC5zj85uFqZ-Ywvze0rF01l8HJZNIM",
  authDomain: "tazeez-73b4f.firebaseapp.com",
  projectId: "tazeez-73b4f",
  storageBucket: "tazeez-73b4f.firebasestorage.app",
  messagingSenderId: "802614142359",
  appId: "1:802614142359:web:34139a82818e3fc18210d2"
};

console.log('Firebase Config:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  apiKeyLength: firebaseConfig.apiKey?.length || 0
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('Firebase initialized successfully');

export { auth, db };