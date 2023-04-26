
document.addEventListener("click", e =>{
    if (e.target.matches("#education *")) {
        window.location.href = "/src/views/customer_service/education.html"
    }
    if (e.target.matches("#support *")) {
        window.location.href = "/src/views/customer_service/support.html"
    }
    if (e.target.matches("#platform *")) {
        window.location.href = "/src/views/customer_service/platform.html"
    }
    if (e.target.matches("#payments *")) {
        window.location.href = "/src/views/customer_service/payments.html"
    }
    if (e.target.matches("#human-talent *")) {
        window.location.href = "/src/views/customer_service/TA.html"
    }

})




const vc = document.querySelector(".image-section");
window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2000,
  origin: "bottom",
  distance: "-5px",
});




window.addEventListener("load", ()=>{
    document.getElementById("loader").classList.toggle("loader2");

  })