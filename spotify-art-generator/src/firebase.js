import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import "firebase/database";
import firebaseConfig from "./config";

console.log("Firebase Config:", firebaseConfig);

/*
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };
*/

const app = initializeApp(firebaseConfig);

export const databaseRef = ref(getDatabase(app));
export default app;
