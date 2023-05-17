import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByIkoIyhocF8vxqPCCDXmG3bPY0G7loIA",
  authDomain: "fir-twittter.firebaseapp.com",
  projectId: "fir-twittter",
  storageBucket: "fir-twittter.appspot.com",
  messagingSenderId: "179153268145",
  appId: "1:179153268145:web:25035db2e6ce308635e190",
  measurementId: "G-7DLTVNVEQL",
};

export const firebase = initializeApp(firebaseConfig);
