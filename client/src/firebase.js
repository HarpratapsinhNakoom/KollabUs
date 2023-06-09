import {initializeApp} from 'firebase/app';
import "firebase/auth";
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebase_db = getFirestore(app);
export const getCurrentTimeStamp = serverTimestamp();
export const formattedDoc = (doc) => {
  return ({
    ...doc.data(),
    id: doc.id
  })
}