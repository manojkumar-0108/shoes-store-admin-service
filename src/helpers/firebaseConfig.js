
// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDwT1tBSG6Tzl0JatisOWiYJXldg7uJIXc",
    authDomain: "shoesstore-50c69.firebaseapp.com",
    projectId: "shoesstore-50c69",
    storageBucket: "shoesstore-50c69.appspot.com",
    messagingSenderId: "890129084359",
    appId: "1:890129084359:web:e4c8fb052edbfca26c73e2",
    measurementId: "G-NRHQCZ5E98"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
