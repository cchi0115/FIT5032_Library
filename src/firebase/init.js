import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGSt5kZkE_OR2FMJuayMiBUN668JWv80Q",
  authDomain: "week7lab-ac261.firebaseapp.com",
  projectId: "week7lab-ac261",
  storageBucket: "week7lab-ac261.firebasestorage.app",
  messagingSenderId: "34160129844",
  appId: "1:34160129844:web:6c3f1b3fda51370d1a1761"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db