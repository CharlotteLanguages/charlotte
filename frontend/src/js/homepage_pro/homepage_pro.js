

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
  if (e.target.matches(".menu_items *")) {

    changeStyles();
    
  }


});


function changeStyles(){
  d.querySelector(".content_dropdown").classList.toggle("showDropdow")
  d.querySelector(".menu_items").classList.toggle("changeColor")
  d.querySelector(".menu-arrow").classList.toggle("rotate")

/*   d.querySelector(".dropdown").classList.toggle("showDrop") */

}




const id = d.querySelector(".container_Countdown");

/* countdDown(id, "Mar 24, 2023 12:59:10", "Feliz Cumpleaños Alberto 🤓"); */

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
  const result = activity.filter((activities) => activities.category === "Pro");
  
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
