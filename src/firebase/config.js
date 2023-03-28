import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBt62iLD5KCT0pBbDjE7LKfYacWGlNpWxQ",
  authDomain: "miniblog-40e24.firebaseapp.com",
  projectId: "miniblog-40e24",
  storageBucket: "miniblog-40e24.appspot.com",
  messagingSenderId: "88345482438",
  appId: "1:88345482438:web:8906143c723ffec179b3c7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db };