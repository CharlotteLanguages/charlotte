

const d = document,  
      $fragment = d.createDocumentFragment()


      d.addEventListener("click", (e) => {
  if (e.target.matches(".open_tooltip")) {
    d.querySelector(".tooltip").classList.toggle("show_tooltip");
    d.querySelector(".open_tooltip").classList.toggle("fa-chevron-down");
    d.querySelector(".open_tooltip").classList.toggle("fa-chevron-up");
    d.querySelector(".tooltip_message").classList.remove("show_notifications");
  }

  if (e.target.matches(".notifications")) {
    d.querySelector(".tooltip_message").classList.toggle("show_notifications");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    d.querySelector(".open_tooltip").classList.add("fa-chevron-down");
    d.querySelector(".open_tooltip").classList.remove("fa-chevron-up");
  }
});




function countdDown(id, limitDate, finalMessage) {
  const d = document;
  const $countdown = id,
    countdownDate = new Date(limitDate).getTime();

  let countdownTempo = setInterval(() => {
    let now = new Date().getTime(); //para definir fecha actual
    let limiTime = countdownDate - now; //para hacer el control regresivo tenemos que restar, la fecha ala que queremos llegar menos la fecha actual, asi se sabe cuanto falta
    let days = Math.floor(limiTime / (1000 * 60 * 60 * 24)), //convertir a Dias
      hours = (
        "0" + Math.floor((limiTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).slice(-2),
      minutes = (
        "0" + Math.floor((limiTime % (1000 * 60 * 60)) / (1000 * 60))
      ).slice(-2), // el slice es para tomar los ultimos 2 valores, de atras hacia adelante
      seconds = ("0" + Math.floor((limiTime % (1000 * 60)) / 1000)).slice(-2); // el slice es para tomar los ultimos 2 valores, de atras hacia adelante;

    $countdown.innerHTML = `<h3 class = "coutndown"> Your test ends in ${days} Days ${hours} Hours ${minutes} Minutes
     ${seconds} Seconds </h3> `;

    if (limiTime < 0) {
      clearInterval(countdownTempo);
      $countdown.innerHTML = `<h3> ${finalMessage} </h3>`;
    }
  }, 1000);
}

const id = d.querySelector(".container_Countdown");

countdDown(id, "Mar 24, 2023 12:59:10", "Feliz Cumpleaños Alberto 🤓");

const API_URL = "http://localhost:3000/activities";

const loadData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    printActivities(json);
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

function printActivities(activity) {
  const result = activity.filter((activities) => activities.category === "Pro +");
  
  result.filter((free) => {
    switch (free.level) {
      case "Basic l":
         let input = d.querySelectorAll(".item-one .dropdown__sub");
         input.forEach(el =>{
          el.innerHTML += ` 
          <li class="dropdown__li">
          <a href="" class="dropdown__anchor">${free.activitiName}</a>
          </li>`
         })
        break;
      case "Basic ll":
        let basic2 = d.querySelectorAll(".item-two .dropdown__sub");
        basic2.forEach(el =>{
         el.innerHTML += ` 
          <li class="dropdown__li">
          <a href="" class="dropdown__anchor">${free.activitiName}</a>
          </li>
         `
        })
     
        break;
      case "Intermediate l":
        let intermediate1 = d.querySelectorAll(".item-three .dropdown__sub");
        intermediate1.forEach(el =>{
         el.innerHTML += ` 
         <li class="dropdown__li">
         <a href="" class="dropdown__anchor">${free.activitiName}</a>
         </li>
         `
        })
        break;
      case "Intermediate ll":
        let intermediate2 = d.querySelectorAll(".item-four .dropdown__sub");
        intermediate2.forEach(el =>{
         el.innerHTML += ` 
         <li class="dropdown__li">
         <a href="" class="dropdown__anchor">${free.activitiName}</a>
         </li>
         `
        })
        break;
      case "Upper Intermediate l":
        let upperIntermediate1 = d.querySelectorAll(".item-five .dropdown__sub");
        upperIntermediate1.forEach(el =>{
         el.innerHTML += ` 
         <li class="dropdown__li">
         <a href="" class="dropdown__anchor">${free.activitiName}</a>
         </li>
         `
        })
        break;
      case "Upper Intermediate ll":
        let upperIntermediate2 = d.querySelectorAll(".item-six .dropdown__sub");
        upperIntermediate2.forEach(el =>{
         el.innerHTML += ` 
         <li class="dropdown__li">
          <a href="" class="dropdown__anchor">${free.activitiName}</a>
          </li>
         `
        })
        break;
      case "Advanced":
        let advanced = d.querySelectorAll(".item-seven .dropdown__sub");
        advanced.forEach(el =>{
         el.innerHTML += ` 
         <li class="dropdown__li">
         <a href="" class="dropdown__anchor">${free.activitiName}</a>
         </li>
         `
        })
        break;
    }
  });

  /*    const basic2 = result.filter(free => free.level==="Basic ll"); */
}

d.addEventListener("DOMContentLoaded", (e) => {
  loadData();
});
