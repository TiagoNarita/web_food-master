import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Adicione esta
const firebaseConfig = {
  apiKey: "AIzaSyAVqCOLA5YjfZZ57OXYZH-WJ3B4zOecN-c",
  authDomain: "web-food-17212.firebaseapp.com",
  databaseURL: "https://web-food-17212-default-rtdb.firebaseio.com",
  projectId: "web-food-17212",
  storageBucket: "web-food-17212.appspot.com",
  messagingSenderId: "1031403165221",
  appId: "1:1031403165221:web:7f3335dca8b271c47391cc",
  measurementId: "G-1EP5F8DPNT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app); // Adicione esta linha

export const auth = getAuth(app);
export { database, storage };
