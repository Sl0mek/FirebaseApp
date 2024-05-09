import * as firebase from "./firebase";

const homeButton = document.querySelector('button.btn.btn-primary');
const submitButton = document.querySelector('button.btn.btn-primary.btn-block.mt-3');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

homeButton.addEventListener('click', ev => {
    window.location.href = '../index.html';
});

submitButton.addEventListener('click', ev => {
    ev.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log("2 teswt")
    console.log(email)
    console.log(password)

    firebase.tryCreateUser(email, password)
    .then((userCredential) => {
        // Signed in 
        console.log("ok")
        const user = userCredential.data.user;
        console.log(user)
        // ...
    })
    .catch((error) => {
        console.log("nok")
        const errorCode = error.error.code;
        const errorMessage = error.error.message;
        console.log(errorCode)
        console.log(errorMessage)
    });
});

