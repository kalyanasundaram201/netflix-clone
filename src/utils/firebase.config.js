import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore, collection, doc, addDoc, getDocs,deleteDoc, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzUdAeyDFOx2Hs88lXavkrcbDISBwk1y8",
  authDomain: "react-netflix-clone-5c2d7.firebaseapp.com",
  projectId: "react-netflix-clone-5c2d7",
  storageBucket: "react-netflix-clone-5c2d7.appspot.com",
  messagingSenderId: "1074434268666",
  appId: "1:1074434268666:web:39a8f03aa7f8c5a7a7d843",
  measurementId: "G-VQ857VXYH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);


const db = getFirestore(app);

// Function to store data to the document
export const storeData = async (data) => {
  try {
    const documentRef = doc(db, 'likedmovies', 'ns1oQDaQbawDO93wWYnv');
    const movieCollectionRef = collection(documentRef, 'moviecollection');
    await addDoc(movieCollectionRef, data);
    console.log("Data stored successfully!");
  } catch (error) {
    console.error("Error storing data: ", error);
  }
};

// Function to retrieve data from the moviecollection subcollection and return as array
export const retrieveData = async () => {
  try {
    const documentRef = doc(db, 'likedmovies', 'ns1oQDaQbawDO93wWYnv');
    const movieCollectionRef = collection(documentRef, 'moviecollection');
    const querySnapshot = await getDocs(movieCollectionRef);
    
    const dataArray = [];
    querySnapshot.forEach((doc) => {
      dataArray.push(doc.data());
    });
    
    return dataArray;
  } catch (error) {
    console.error("Error retrieving data: ", error);
    return []; // Return empty array if error occurs
  }
};

// Function to delete a document by ID from the moviecollection subcollection
export const deleteDataById = async (id) => {
  try {
    const documentRef = doc(db, 'likedmovies', 'ns1oQDaQbawDO93wWYnv');
    const movieCollectionRef = collection(documentRef, 'moviecollection');
    
    // Query for the document with the specified ID
    const q = query(movieCollectionRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    
    // If the document exists, delete it
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log("Document with ID", id, "deleted successfully!");
    });
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
