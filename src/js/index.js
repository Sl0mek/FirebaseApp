import * as firebase from "./firebase";

const signUpButton = document.querySelector('button.btn.btn-primary');
const logInButton = document.querySelector('button.btn.btn-outline-success');
const loginSignContainer = document.querySelector('.login-sign-container');
const logoutContainer = document.querySelector('.logout-container');


logInButton.addEventListener('click', ev => {
    window.location.href = '../login.html';
});

signUpButton.addEventListener('click', ev => {
    window.location.href = '../createAccount.html';
});

logoutContainer.addEventListener('click', ev => {
    firebase.tryLogoutUser()
    .then((data) => {
        const userEmail = localStorage.getItem('userEmail');
        localStorage.removeItem('userEmail');
        console.log(`Unlogged ${userEmail}`);
        loginSignContainer.classList.remove('d-none');
        logoutContainer.classList.add('d-none');
    })
    .catch((error) => {
        console.log(error);
    })
});

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('userEmail')) {
        const userEmail = localStorage.getItem('userEmail');
        document.getElementById('userEmailParagraph').textContent = `Hello, ${userEmail}!`;
        loginSignContainer.classList.add('d-none');
        logoutContainer.classList.remove('d-none');
    } else {
        loginSignContainer.classList.remove('d-none');
        logoutContainer.classList.add('d-none');
    }
});