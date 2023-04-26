import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAQ9O3bDNj3r3ZbW6DWHpGoUH72svdBQWY",
  authDomain: "semester-project-3b0dd.firebaseapp.com",
  databaseURL: "https://semester-project-3b0dd-default-rtdb.firebaseio.com/",
  projectId: "semester-project-3b0dd",
  storageBucket: "semester-project-3b0dd.appspot.com",
  messagingSenderId: "35124261735",
  appId: "1:35124261735:web:986e27ab035703338d75c2",
  measurementId: "G-NMPTDVQW53"
};

const app = initializeApp(firebaseConfig, "semester-project-838f6"); // Add a name for the app instance

export const databaseRef = ref(getDatabase(app));
export default app;
