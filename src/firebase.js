import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCIRvOm4cyP-cxhdJiNQVVm16Ns0osZsQg",
  authDomain: "amritchating.firebaseapp.com",
  projectId: "amritchating",
  storageBucket: "amritchating.firebasestorage.app",
  messagingSenderId: "338863245760",
  appId: "1:338863245760:web:be89d51f2c356b34fae025",
  measurementId: "G-XF2VX8NM3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app; 