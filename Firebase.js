// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyBusFbHbfKedG2_UDpFi8V8g1JPEwF0wDk",
    authDomain: "southern-rentals-53ff0.firebaseapp.com",
    projectId: "southern-rentals-53ff0",
    storageBucket: "southern-rentals-53ff0.appspot.com",
    messagingSenderId: "163919016450",
    appId: "1:163919016450:web:43c9aea195dbb335846d1b",
    measurementId: "G-4QXFN642QM"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { firestore, storage };