// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy2qwHVBODxWcYsqu7ZN_zRnvDtYwTiHU",
  authDomain: "podcast-platform-6580f.firebaseapp.com",
  projectId: "podcast-platform-6580f",
  storageBucket: "podcast-platform-6580f.appspot.com",
  messagingSenderId: "687725244216",
  appId: "1:687725244216:web:3bfd3080da7f7f15869bcd",
  measurementId: "G-715GXCX99Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
const auth=getAuth(app)
const analytics = getAnalytics(app);
export{auth,db,storage}