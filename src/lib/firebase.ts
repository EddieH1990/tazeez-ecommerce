import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase.config';

// Debug: Log Firebase config (without exposing full API key)
console.log('Firebase Config Check:', {
  apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.slice(0, 5)}...` : 'missing',
  authDomain: firebaseConfig.authDomain || 'missing',
  projectId: firebaseConfig.projectId || 'missing'
});

if (!firebaseConfig.apiKey) {
  console.error('Firebase API Key is missing! Check your environment variables.');
}

console.log('Initializing Firebase with config:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('Firebase initialized:', {
  isAuthInitialized: auth !== null,
  isDbInitialized: db !== null
});

export const auth = auth;
export const db = db;