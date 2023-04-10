import {initializeApp} from 'firebase/app';
import "firebase/auth";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


// const app=firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// })

const firebaseConfig = {
  apiKey: "AIzaSyAmU8oJYYkJp8MBce_lQb8gwDH7G9fbgmU",
  authDomain: "kollabus.firebaseapp.com",
  projectId: "kollabus",
  storageBucket: "kollabus.appspot.com",
  messagingSenderId: "453776613799",
  appId: "1:453776613799:web:100a88c7fa6a7d63575682"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebase_db = getFirestore(app);