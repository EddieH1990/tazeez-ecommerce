import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthStore } from '../store/useAuthStore';

export const initializeAuth = () => {
  onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
  });
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};