var e=globalThis,t={},n={},s=e.parcelRequire66c7;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in n){var s=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,s.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequire66c7=s),s.register;var o=s("cOa8X");const a=document.querySelector("button.btn.btn-primary"),d=document.querySelector("button.btn.btn-outline-success"),c=document.querySelector(".login-sign-container"),l=document.querySelector(".logout-container"),i=document.querySelector("h2.userEmail.my-3"),r=document.querySelector("div.container.mb-3"),u=document.querySelector("ul#taskList.list-group.mt-3"),m=document.querySelector("button.btn.btn-success.mb-3.shadow"),g=document.querySelector("input#taskName.form-control"),b=document.querySelector("div.d-flex.justify-content-evenly");function L(e){u.innerHTML="",o.getUsersTasks(e).then(t=>{t.data.forEach(t=>{let n=document.createElement("li"),s=document.createElement("button");n.classList.add("list-group-item","d-flex","flex-row","justify-content-between"),t.data().isDone?(n.classList.add("bg-success"),s.textContent="Delete",s.classList.add("btn","btn-danger","btn-sm","btn-block","shadow"),s.style.width="80px",s.id=t.id,s.addEventListener("click",t=>{o.deleteTask(t.target.id).then(n=>{t.target.classList.remove("bg-success"),t.target.classList.add("bg-warning"),b.classList.remove("d-none"),L(e)})})):(n.classList.add("bg-warning"),s.textContent="Confirm",s.classList.add("btn","btn-success","btn-sm","mr-2","btn-block","shadow"),s.style.width="80px",s.id=t.id,s.addEventListener("click",t=>{o.confirmTask(t.target.id).then(t=>{b.classList.remove("d-none"),L(e)})})),n.textContent=t.data().name,n.appendChild(s),u.appendChild(n)}),b.classList.add("d-none")})}d.addEventListener("click",e=>{window.location.href="../login.html"}),a.addEventListener("click",e=>{window.location.href="../createAccount.html"}),l.addEventListener("click",e=>{o.tryLogoutUser().then(e=>{let t=localStorage.getItem("userEmail");localStorage.removeItem("userEmail"),console.log(`Unlogged ${t}`),c.classList.remove("d-none"),l.classList.add("d-none"),r.classList.add("d-none")}).catch(e=>{console.log(e)})}),document.addEventListener("DOMContentLoaded",function(){if(localStorage.getItem("userEmail")){let e=localStorage.getItem("userEmail");c.classList.add("d-none"),l.classList.remove("d-none"),r.classList.remove("d-none"),i.textContent=`Hello, ${e}!`,o.getUsersTasks(e).then(t=>{t.data.forEach(t=>{let n=document.createElement("li"),s=document.createElement("button");n.classList.add("list-group-item","d-flex","flex-row","justify-content-between"),t.data().isDone?(n.classList.add("bg-success"),s.textContent="Delete",s.classList.add("btn","btn-danger","btn-sm","btn-block","shadow"),s.style.width="80px",s.id=t.id,s.addEventListener("click",t=>{o.deleteTask(t.target.id).then(n=>{t.target.classList.remove("bg-success"),t.target.classList.add("bg-warning"),b.classList.remove("d-none"),L(e)})})):(n.classList.add("bg-warning"),s.textContent="Confirm",s.classList.add("btn","btn-success","btn-sm","mr-2","btn-block","shadow"),s.style.width="80px",s.id=t.id,s.addEventListener("click",t=>{o.confirmTask(t.target.id).then(t=>{b.classList.remove("d-none"),L(e)})})),n.textContent=t.data().name,n.appendChild(s),u.appendChild(n)}),b.classList.add("d-none")})}else c.classList.remove("d-none"),l.classList.add("d-none"),r.classList.add("d-none")}),m.addEventListener("click",e=>{e.preventDefault();let t=localStorage.getItem("userEmail"),n=g.value;console.log("task: ",n),n&&o.addNewTaskToUser(t,n).then(e=>{console.log("Addedd: ",e),b.classList.remove("d-none"),L(t)}).catch(e=>{console.log(e)})});
//# sourceMappingURL=index.40134946.js.map
