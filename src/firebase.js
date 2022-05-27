// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuBik0wJKukPGocoIHf12Ale9KCQastsE",
  authDomain: "sparta-react-basic-8686e.firebaseapp.com",
  projectId: "sparta-react-basic-8686e",
  storageBucket: "sparta-react-basic-8686e.appspot.com",
  messagingSenderId: "657239496634",
  appId: "1:657239496634:web:136784fa2c2428a2ee6f83",
  measurementId: "G-P2GCR707F0"
};

initializeApp(firebaseConfig)
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const db = getFirestore();
