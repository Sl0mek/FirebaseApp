import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut  } from "firebase/auth";
import { getFirestore, doc, getDoc, getDocs, collection, setDoc, query, where, updateDoc, deleteDoc  } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCsQDagi6-tTSsYMOq-bnTdsc94MySc54Y",
  authDomain: "fir-app-283f5.firebaseapp.com",
  projectId: "fir-app-283f5",
  storageBucket: "fir-app-283f5.appspot.com",
  messagingSenderId: "605165677649",
  appId: "1:605165677649:web:91df69934620182e689c70"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



export function tryLoginUser(email, password){
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            resolve({ data: userCredential, error: null });
        })
        .catch((error) => {
            reject({ data: null, error: error });
        });
    });
}

export function tryLogoutUser(){
    return new Promise((resolve, reject) => {
        signOut(auth)
        .then(() => {
            resolve({ data: "Sucess", error: null });
        })
        .catch((error) => {
            reject({ data: null, error: error });
        });
    });
}

export function tryCreateUser(email, password){
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            resolve({ data: userCredential, error: null });
        })
        .catch((error) => {
            reject({ data: null, error: error });
        });
    });
}

export function  getUsersTasks(email){
    const q = query(collection(db, "todo"), where("user", "==", email));
    console.log(email);

    return new Promise((resolve, reject) => {
        getDocs(q)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
            resolve({ data: querySnapshot, error: null });
        })
        .catch((error) => {
            console.log("No such document!");
            reject({ data: null, error: error });
        });
    });
}

export function addNewTaskToUser(email, task){
    // Add a new document with a generated id
    const todo = doc(collection(db, "todo"));
    const data = {
        user: email,
        name: task,
        isDone: false
    }

    return new Promise((resolve, reject) => {
        setDoc(todo, data)
        .then((data) => {
            console.log("Added: ", data);
            resolve(data);
        })
        .catch((error) => {
            console.log("No such document!");
            reject(error);
        });
    });

}

export function confirmTask(id){
    const taskRef = doc(db, "todo", id);
    const data = {
        isDone: true
    }
    return new Promise((resolve, reject) => {
        updateDoc(taskRef, data)
        .then((data) => {
            console.log(`Updated ${id}: ${data}`);
            resolve(data);
        })
        .catch((error) => {
            console.log("Wrong update!");
            reject(error);
        });
    });
}

export function deleteTask(id){
    const taskRef = doc(db, "todo", id);
    return new Promise((resolve, reject) => {
        deleteDoc(taskRef)
        .then((id) => {
            console.log(`Deleted ${id}`);
            resolve(id);
        })
        .catch((error) => {
            console.log("Wrong deleted!");
            reject(error);
        });
    });
}