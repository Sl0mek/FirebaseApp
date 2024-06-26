import * as firebase from "./firebase";

const signUpButton = document.querySelector('button.btn.btn-primary');
const logInButton = document.querySelector('button.btn.btn-outline-success');
const loginSignContainer = document.querySelector('.login-sign-container');
const logoutContainer = document.querySelector('.logout-container');
const userEmailHeader = document.querySelector('h2.userEmail.my-3');
const containerDiv = document.querySelector('div.container.mb-3');
const taskList = document.querySelector('ul#taskList.list-group.mt-3');
const addButton = document.querySelector('button.btn.btn-success.mb-3.shadow');
const taskNameInput = document.querySelector('input#taskName.form-control');
const spinner = document.querySelector('div.d-flex.justify-content-evenly');


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
                const button = document.createElement('button');
                newItem.classList.add('list-group-item', 'd-flex', 'flex-row', 'justify-content-between');
                if(doc.data().isDone){
                    newItem.classList.add('bg-success');

                    button.textContent = 'Delete';
                    button.classList.add('btn', 'btn-danger', 'btn-sm', 'btn-block', 'shadow');
                    button.style.width = '80px';
                    button.id = doc.id;
                    button.addEventListener('click', (ev) => {
                        firebase.deleteTask(ev.target.id)
                        .then(data =>{
                            ev.target.classList.remove('bg-success');
                            ev.target.classList.add('bg-warning');
                            spinner.classList.remove('d-none');
                            refreshTasks(userEmail);
                        })
                    });
                }else{
                    newItem.classList.add('bg-warning');

                    button.textContent = 'Confirm';
                    button.classList.add('btn', 'btn-success', 'btn-sm', 'mr-2', 'btn-block', 'shadow');
                    button.style.width = '80px';
                    button.id = doc.id;
                    button.addEventListener('click', (ev) => {
                        firebase.confirmTask(ev.target.id)
                        .then(data =>{
                            spinner.classList.remove('d-none');
                            refreshTasks(userEmail);
                        })
                    });
                }
                newItem.textContent = doc.data().name;
                // newItem.id = doc.id;
                
                newItem.appendChild(button);

                taskList.appendChild(newItem);
            });
            spinner.classList.add('d-none');
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
            spinner.classList.remove('d-none');
            refreshTasks(userEmail);
        })
        .catch((error) => {
            console.log(error);
        })
    }
});

function refreshTasks(userEmail){
    taskList.innerHTML = "";
    firebase.getUsersTasks(userEmail)
        .then(data => {
            const qs = data.data;
            qs.forEach((doc) => {
                const newItem = document.createElement('li');
                const button = document.createElement('button');
                newItem.classList.add('list-group-item', 'd-flex', 'flex-row', 'justify-content-between');
                if(doc.data().isDone){
                    newItem.classList.add('bg-success');

                    button.textContent = 'Delete';
                    button.classList.add('btn', 'btn-danger', 'btn-sm', 'btn-block', 'shadow');
                    button.style.width = '80px';
                    button.id = doc.id;
                    button.addEventListener('click', (ev) => {
                        firebase.deleteTask(ev.target.id)
                        .then(data =>{
                            ev.target.classList.remove('bg-success');
                            ev.target.classList.add('bg-warning');
                            spinner.classList.remove('d-none');
                            refreshTasks(userEmail);
                        })
                    });
                }else{
                    newItem.classList.add('bg-warning');

                    button.textContent = 'Confirm';
                    button.classList.add('btn', 'btn-success', 'btn-sm', 'mr-2', 'btn-block', 'shadow');
                    button.style.width = '80px';
                    button.id = doc.id;
                    button.addEventListener('click', (ev) => {
                        firebase.confirmTask(ev.target.id)
                        .then(data =>{
                            spinner.classList.remove('d-none');
                            refreshTasks(userEmail);
                        })
                    });
                }
                newItem.textContent = doc.data().name;
                newItem.appendChild(button);
                taskList.appendChild(newItem);
            });
            spinner.classList.add('d-none');
        })
}
