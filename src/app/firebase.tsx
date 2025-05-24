import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  Auth,
  UserCredential,
  createUserWithEmailAndPassword as firebaseCreateUser,
  signInWithEmailAndPassword as firebaseSignInWithEmail,
  signInWithPopup as firebaseSignInWithPopup,
  signOut
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
const auth: Auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Add typed wrapper functions
const createUserWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => {
  return firebaseCreateUser(auth, email, password);
};

const signInWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => {
  return firebaseSignInWithEmail(auth, email, password);
};

const signInWithPopup = (): Promise<UserCredential> => {
  return firebaseSignInWithPopup(auth, provider);
};

export { 
  auth,
  provider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
};