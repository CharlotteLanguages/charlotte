const d = document;
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
  
  
d.addEventListener("click", (e) => {
    if (e.target.matches("#activitie_1")) {
/*       d.querySelector(".tooltip").classList.toggle("show_tooltip"); */
      d.querySelector("#activitie_1").classList.toggle("fa-chevron-right");
      d.querySelector("#activitie_1").classList.toggle("fa-chevron-down");
/*       d.querySelector(".tooltip_message").classList.remove("show_notifications"); */
    }
  
  });


 function countdowni(id, limitDate, finalMessage) {
    const d = document;
  const $countdown = id,
    countdownDate = new Date(limitDate).getTime();

  let countdownTempo = setInterval(() => {
    let now = new Date().getTime(); //para definir fecha actual
    let limiTime = countdownDate - now; //para hacer el control regresivo tenemos que restar, la fecha ala que queremos llegar menos la fecha actual, asi se sabe cuanto falta
    let days = Math.floor(limiTime /(1000 *60 * 60 * 24)), //convertir a Dias
    hours =( "0" + Math.floor((limiTime % (1000 *60 * 60 * 24))/ (1000 * 60 * 60))).slice(-2) , 
    minutes = ("0" + Math.floor((limiTime % (1000 *60 *60)) / (1000 * 60)) ).slice(-2), // el slice es para tomar los ultimos 2 valores, de atras hacia adelante
    seconds = ("0" + Math.floor((limiTime % (1000 *60 )) / (1000)) ).slice(-2) // el slice es para tomar los ultimos 2 valores, de atras hacia adelante;

    $countdown.innerHTML = `<h3 class = "coutndown"> Your test ends in ${days} Days ${hours} Hours ${minutes} Minutes
     ${seconds} Seconds </h3> `;

     if(limiTime<0){
        clearInterval(countdownTempo)
        $countdown.innerHTML = `<h3> ${finalMessage} </h3>`
     }
    console.log(countdownDate);
  }, 1000);
}

  const id = d.querySelector(".container_Countdown")

  countdowni(id,"Mar 19, 2023 12:59:10" ,"Feliz Cumpleaños Alberto 🤓");
  