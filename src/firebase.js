// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA6mu7vkvziQ6Fqjup55ZZskh1X2PmTVao',
  authDomain: 'kingdom-chance-encounter.firebaseapp.com',
  projectId: 'kingdom-chance-encounter',
  storageBucket: 'kingdom-chance-encounter.appspot.com',
  messagingSenderId: '292352716911',
  appId: '1:292352716911:web:be4958dd7ac7eab9079d9a',
  measurementId: 'G-0DDN1R8STP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app); // Service pour l'authentification
export const db = getFirestore(app); // Service pour Firestore
