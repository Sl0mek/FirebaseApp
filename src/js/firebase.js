import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut  } from "firebase/auth";

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

