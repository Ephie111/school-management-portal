import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBT88JO9Zx0B_nIC63JKdlzlZM9YAjTSr8",
  authDomain: "school-app-9e4f0.firebaseapp.com",
  projectId: "school-app-9e4f0",
  storageBucket: "school-app-9e4f0.appspot.com",
  messagingSenderId: "688375361828",
  appId: "1:688375361828:web:04e7300754f4a92057c3b1",
  measurementId: "G-36SGE4WTYS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { 
  auth, 
  provider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
};