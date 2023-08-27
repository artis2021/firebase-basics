import { initializeApp } from "firebase/app";
import {getAuth ,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDyAMie5NK1hpvJddpwihqLcYM3gZQrVwQ",
  authDomain: "fir-course-e21e2.firebaseapp.com",
  projectId: "fir-course-e21e2",
  storageBucket: "fir-course-e21e2.appspot.com",
  messagingSenderId: "915806691384",
  appId: "1:915806691384:web:80c15e14856cd917c246cd",
  measurementId: "G-1C68RPH0V1"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();

export const db=getFirestore(app);
export const storage=getStorage(app);