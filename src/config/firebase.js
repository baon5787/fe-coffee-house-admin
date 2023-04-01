// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDRUp4nadHCi_-t7yVzkLom93RGzNYLgs",
    authDomain: "coffee-house-ed789.firebaseapp.com",
    projectId: "coffee-house-ed789",
    storageBucket: "coffee-house-ed789.appspot.com",
    messagingSenderId: "916434298412",
    appId: "1:916434298412:web:ac5eee4fe46c14a85a9389",
    measurementId: "G-0DYE13855T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)