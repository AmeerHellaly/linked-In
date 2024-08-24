// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZqoZfx1xoVggswUUiaJlTsKa5oAe1gZI",
  authDomain: "linkedin2-clone-b4ed1.firebaseapp.com",
  projectId: "linkedin2-clone-b4ed1",
  storageBucket: "linkedin2-clone-b4ed1.appspot.com",
  messagingSenderId: "1046455634488",
  appId: "1:1046455634488:web:22e412438033d3ded234cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const firestore=getFirestore(app)
const storage=getStorage(app)
export {auth,app,firestore,storage }
