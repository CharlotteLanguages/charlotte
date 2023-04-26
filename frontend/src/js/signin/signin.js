/* import {hacer} from "../homepage_free/homepage_free.js" */

const d = document,
  API_URL = "http://localhost:3000/signup";
const form = d.querySelector(".form");

d.addEventListener("click", (e) => {
  if (e.target.matches(".buttom-signup")) {
    window.location = "/src/views/login/signup.html";
  }
  if (e.target.matches(".forgot")) {
    /* d.querySelector(".container-forgot-password").style.display = "inline";
    d.querySelector(".form").style.display = "none"; */
    d.querySelector(".form").classList.toggle("change-forgot-password");
    d.querySelector(".buttom-signup").classList.toggle(
      "change-forgot-password"
    );
    d.querySelector(".container-forgot-password").classList.toggle(
      "change-forgot-password"
    );
  }
  if (e.target.matches(".cancel-left")) {
    d.querySelector(".form").classList.toggle("change-forgot-password");
    d.querySelector(".container-forgot-password").classList.toggle(
      "change-forgot-password"
    );
    d.querySelector(".buttom-signup").classList.toggle(
      "change-forgot-password"
    );
  }
  if (e.target.matches(".cancel-back")) {
    d.querySelector(".form").classList.toggle("change-forgot-password");
    d.querySelector(".container-forgot-password").classList.toggle(
      "change-forgot-password"
    );
    d.querySelector(".buttom-signup").classList.toggle(
      "change-forgot-password"
    );
  }
});



export const loadData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
      validateUser(json)
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

d.addEventListener("DOMContentLoaded", (e) => {
  loadData();
});




function validateUser(user){
  d.addEventListener("submit", (e) =>{
    e.preventDefault();
     const usuario = user.filter(user=>{
      if(user.userName === form.userName.value && user.password === form.password.value){
       /*  window.location.href = "/src/views/homepage_user/homepage_user.html" */
    /*    return true */
      return user
    /* hacer() */

      }
    })
    

  })
 
}



/* export const usert =  form.userName.value; */


function user(user){
  const usuario = user.filter(user=>{
    if(user.userName === form.userName.value && user.password === form.password.value){
     /*  window.location.href = "/src/views/homepage_free/homepage_free.html" */
     return true

    }
  })
}


window.addEventListener("load", ()=>{
  document.getElementById("loader").classList.toggle("loader2");

})
