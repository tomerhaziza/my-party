import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyC4C2rzW_ueHtemRkXLktc1vdGfo0LGg9s',
  authDomain: 'myparty-8764e.firebaseapp.com',
  projectId: 'myparty-8764e',
  storageBucket: 'myparty-8764e.appspot.com',
  messagingSenderId: '977016105',
  appId: '1:977016105:web:53bf01fb078d8a19835338',
  measurementId: 'G-21N27R14MZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
