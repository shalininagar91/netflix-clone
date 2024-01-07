// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq14C-4SPAA7EYEYX2vtiojREXNbqJRos",
  authDomain: "netflixgpt-ed717.firebaseapp.com",
  projectId: "netflixgpt-ed717",
  storageBucket: "netflixgpt-ed717.appspot.com",
  messagingSenderId: "475957601478",
  appId: "1:475957601478:web:899a87f81bb3fc68f1e3c7",
  measurementId: "G-Y9NSSWVLTH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
