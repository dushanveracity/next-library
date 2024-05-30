// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQO35U30365IlUuH289EOYttKxQ-p8fcI",
  authDomain: "library-app-d0925.firebaseapp.com",
  projectId: "library-app-d0925",
  storageBucket: "library-app-d0925.appspot.com",
  messagingSenderId: "154847273356",
  appId: "1:154847273356:web:4ebd750dfe88e0ee3c76a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app);
