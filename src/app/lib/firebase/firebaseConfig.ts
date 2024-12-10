import { initializeApp } from 'firebase/app'; 
import { getDatabase, ref, set, get, onValue,push} from 'firebase/database'; 

const firebaseConfig = {
    apiKey: "AIzaSyBrallPgsmGCuuYyMtALMLlKP6-t5j80go", 
    authDomain: "chat-a72e1.firebaseapp.com", 
    databaseURL: "https://chat-a72e1-default-rtdb.europe-west1.firebasedatabase.app", 
    projectId: "chat-a72e1", 
    storageBucket: "chat-a72e1.firebasestorage.app", 
    messagingSenderId: "286038223028", 
    appId: "1:286038223028:web:086128ebc9490ffdb54fe1", 
};

// Initialize the Firebase app with the given configuration.
const app = initializeApp(firebaseConfig);

// Connect to the Firebase Realtime Database.
const database = getDatabase(app);

export { database, ref, set, get, onValue ,push}; 

