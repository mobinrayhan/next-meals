// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCZCYsPixxlN4t-fQPKULUoDgy7t_Zjqi0",
  authDomain: "uploadimage-16dd4.firebaseapp.com",
  projectId: "uploadimage-16dd4",
  storageBucket: "uploadimage-16dd4.appspot.com",
  messagingSenderId: "317565381",
  appId: "1:317565381:web:cc8b7273dac9c33fbfc3ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
