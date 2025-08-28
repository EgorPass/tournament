// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSWiGG86-n8BofAYlU5uuHjC8VGVCGYxY",
  authDomain: "tournament-8e1de.firebaseapp.com",
  projectId: "tournament-8e1de",
  storageBucket: "tournament-8e1de.firebasestorage.app",
  messagingSenderId: "91362570460",
  appId: "1:91362570460:web:afde3a9bfe5b47d82e0419",
  measurementId: "G-9R9K1T77W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);