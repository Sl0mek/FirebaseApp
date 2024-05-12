import * as firebase from "./firebase";

const signUpButton = document.querySelector('button.btn.btn-primary');
const logInButton = document.querySelector('button.btn.btn-outline-success');
const loginSignContainer = document.querySelector('.login-sign-container');
const logoutContainer = document.querySelector('.logout-container');
const userEmailHeader = document.querySelector('h2.userEmail.mb-3');
const containerDiv = document.querySelector('div.container.mb-3');
const taskList = document.querySelector('ul#taskList.list-group.mt-3');
const addButton = document.querySelector('button.btn.btn-success.mb-3.shadow');
const taskNameInput = document.querySelector('input#taskName.form-control');


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
        containerDiv.classList.add('d-none');
    })
    .catch((error) => {
        console.log(error);
    })
});

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('userEmail')) {
        const userEmail = localStorage.getItem('userEmail');
        loginSignContainer.classList.add('d-none');
        logoutContainer.classList.remove('d-none');
        containerDiv.classList.remove('d-none');
        userEmailHeader.textContent = `Hello, ${userEmail}!`;
        firebase.getUsersTasks(userEmail)
        .then(data => {
            const qs = data.data;
            qs.forEach((doc) => {
                const newItem = document.createElement('li');
                newItem.classList.add('list-group-item');
                if(doc.data().isDone){
                    newItem.classList.add('bg-success');
                }else{
                    newItem.classList.add('bg-warning');
                }
                newItem.textContent = doc.data().name;
                newItem.id = doc.id;
                taskList.appendChild(newItem);
            });
        })
    } else {
        loginSignContainer.classList.remove('d-none');
        logoutContainer.classList.add('d-none');
        containerDiv.classList.add('d-none');
    }
});


addButton.addEventListener('click', ev => {
    ev.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    const task = taskNameInput.value;
    console.log("task: ", task);
    if(task){
        firebase.addNewTaskToUser(userEmail, task)
        .then((data) => {
            console.log("Addedd: ", data);
            refreshTasks(userEmail);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
});

taskList.addEventListener('click', ev => {
    if(ev.target.id){
        console.log(ev.target.id);
        if(ev.target.classList.contains('bg-warning')){
            firebase.confirmTask(ev.target.id)
            .then(data =>{
                ev.target.classList.add('bg-success');
                ev.target.classList.remove('bg-warning');
            })
        }else if(ev.target.classList.contains('bg-success')){
            firebase.deleteTask(ev.target.id)
            .then(id =>{
                const userEmail = localStorage.getItem('userEmail');
                refreshTasks(userEmail);
            })
        }
        
    }
});

function refreshTasks(userEmail){
    taskList.innerHTML = "";
    firebase.getUsersTasks(userEmail)
        .then(data => {
            const qs = data.data;
            qs.forEach((doc) => {
                const newItem = document.createElement('li');
                newItem.classList.add('list-group-item');
                if(doc.data().isDone){
                    newItem.classList.add('bg-success');
                }else{
                    newItem.classList.add('bg-warning');
                }
                newItem.textContent = doc.data().name;
                newItem.id = doc.id;
                taskList.appendChild(newItem);
            });
        })
}
