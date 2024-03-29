import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  where,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURMENT_ID,
};

initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();

export const authService = {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged: (callback) => {
    return auth.onAuthStateChanged(callback);
  },
};

export const dbService = {
  firestore,
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  where,
  query,
  orderBy,
  Timestamp,
};

export const storageService = {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
};
