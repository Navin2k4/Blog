import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "blog-2fbac.firebaseapp.com",
    projectId: "blog-2fbac",
    storageBucket: "blog-2fbac.appspot.com",
    messagingSenderId: "18623489378",
    appId: "1:18623489378:web:09b9085cd08502b4bf783b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
