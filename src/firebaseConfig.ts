// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrjgydiEWbpKbjL_ccDmh47woViO2tCiM",
  authDomain: "sports-edge-e41ea.firebaseapp.com",
  projectId: "sports-edge-e41ea",
  storageBucket: "sports-edge-e41ea.appspot.com",
  messagingSenderId: "295722556017",
  appId: "1:295722556017:web:61a6ff82c3b7451a51d9d0",
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
