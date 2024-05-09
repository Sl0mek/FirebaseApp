import * as firebase from "./firebase";


const homeButton = document.querySelector('button.btn.btn-primary');
const loginButton = document.querySelector('button.btn.btn-success.btn-block.mt-3');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

homeButton.addEventListener('click', ev => {
    window.location.href = '../index.html';
});

loginButton.addEventListener('click', ev => {
    ev.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log("1 teswt")
    console.log(email)
    console.log(password)

    firebase.tryLoginUser(email, password)
    .then((userCredential) => {
        const user = userCredential.data.user;
        console.log(user)
        const userEmail = user.email;
        localStorage.setItem('userEmail', userEmail);
        console.log(`Logged ${userEmail}`);
        window.location.href = '../index.html';
    })
    .catch((error) => {
        const errorCode = error.error.code;
        const errorMessage = error.error.message;
        console.log(errorCode)
        console.log(errorMessage)
        console.log(`Login failed`);
    });
});
