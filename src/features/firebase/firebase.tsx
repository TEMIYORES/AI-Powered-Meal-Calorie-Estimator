// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-powered-study-assistant.firebaseapp.com",
  projectId: "ai-powered-study-assistant",
  storageBucket: "ai-powered-study-assistant.appspot.com",
  messagingSenderId: "333838565281",
  appId: "1:333838565281:web:c038c0bd4ff72b0be415e0",
  measurementId: "G-FPM73SNV68",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, auth };
