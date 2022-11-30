import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA6WhBJvZEgAeri4Ige9f7zKy-b0m5-AO4",
    authDomain: "womanupbackend-bf56c.firebaseapp.com",
    projectId: "womanupbackend-bf56c",
    storageBucket: "womanupbackend-bf56c.appspot.com",
    messagingSenderId: "52272313881",
    appId: "1:52272313881:web:1f1f12df0346d1ee935c88",
    measurementId: "G-MJCB8WSFTP"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)