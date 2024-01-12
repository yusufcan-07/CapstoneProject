import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARk8ktffrdqkuithgUexGUpAcxhwdSs78",
  authDomain: "stock-portfolio-app-b79ab.firebaseapp.com",
  projectId: "stock-portfolio-app-b79ab",
  storageBucket: "stock-portfolio-app-b79ab.appspot.com",
  messagingSenderId: "288266796122",
  appId: "1:288266796122:web:335bed0eb346b48a6e6c63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initiaize authentication
export const auth = getAuth(app);
