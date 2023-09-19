const d = document

window.addEventListener("load", ()=>{
    
    setTimeout(() => {
        d.querySelector(".modal_window").style.opacity = "1";
        d.querySelector(".modal_window").style.visibility = "visible";
        d.querySelector(".window").classList.toggle("modal-cl");
        
    },5000);
})

d.addEventListener("click", (e)=>{
    if(e.target.matches(".btn_confirm")){
        d.querySelector(".window").classList.toggle("modal-cl");
        setTimeout(() => { 
            d.querySelector(".modal_window").style.opacity = "0";
            d.querySelector(".modal_window").style.visibility = "hidden";
          }, 700);

    }
/*     if(e.target.matches(".open_tooltip")){
        d.querySelector(".tooltip").classList.toggle("show_tooltip");
    }
    if(e.target.matches(".fa-chevron-down")){
        d.querySelector("#down").classList.toggle("hidden_down");a
        alert("hola")
    } */
})


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
  


/* d.addEventListener("DOMContentLoaded"), ()=>{
    const elementsCarousel = d.querySelectorAll(".carousel")
    M.Carousel.init(elementsCarousel,{
        duration: 150
    });
} */


d.addEventListener("click", (e)=>{
  if(e.target.matches(".btn-resume")){
    d.querySelector(".container_enrolled").style.opacity = "1";
    d.querySelector(".container_enrolled").style.visibility = "visible";
    d.querySelector(".enrolled_course").classList.toggle("move_modal-certificate");
  }
  if(e.target.matches(".container_enrolled")){
    d.querySelector(".enrolled_course").classList.toggle("move_modal-certificate");
    setTimeout(() => { 
      d.querySelector(".container_enrolled").style.opacity = "0";
    d.querySelector(".container_enrolled").style.visibility = "hidden";
      }, 700);
    
  }
})
/* 
const select = d.querySelector(".fa-angle-down"),
options = d.querySelector("#options"),
arrowUp = d.querySelector(".fa-angle-up"),
arrowDown = d.querySelector(".fa-angle-down"),
contenSelect = d.querySelector("#select .content-select"),
hiideInput = d.querySelector("#inputSelect")


d.querySelectorAll("#options > .option").forEach(option=>{
  option.addEventListener("click", (e)=>{
    e.preventDefault();
    contenSelect.innerHTML = e.currentTarget.innerHTML
    options.classList.toggle("active")    
  })
})


select.addEventListener("click", ()=>{
  options.classList.toggle("active");
  arrowUp.classList.toggle("fa-angle-down");
  arrowDown.classList.toggle("fa-angle-up")
})


d.addEventListener("click", (e)=>{
  if(e.target.matches("#brasil")){
    window.location.href = "/src/views/homepage/homepagePt.html"
  }
  if(e.target.matches("#spain")){
    window.location.href = "/src/views/homepage/homepageEs.html"
  }
  if(e.target.matches("#france")){
    window.location.href = "/src/views/homepage/homepageFra.html"
  }
  if(e.target.matches("#eeuu")){
    window.location.href = "/src/views/homepage/homepage.html"
  }
}) */


/* var swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
}); */

var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
    slideShadows: true
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

function slider() {
  const $nextBtn = d.querySelector(".slider-btns .next"),
    $prevBtn = d.querySelector(".slider-btns .prev"),
    $slides = d.querySelectorAll(".slider-slide");
  let i = 0;
  d.addEventListener("click", (e) => {
    if (e.target === $prevBtn) {
      e.preventDefault();
      $slides[i].classList.remove("active");
      i--;
      if (i < 0) i = $slides.length - 1;
      $slides[i].classList.add("active");
    }

    if (e.target === $nextBtn) {
      e.preventDefault();
      $slides[i].classList.remove("active");
      i++;
      if (i >= $slides.length) i = 0;
      $slides[i].classList.add("active");
    }
  });

  setInterval(() => {
    $slides[i].classList.remove("active");
    i++;
    if (i >= $slides.length) i = 0;
    $slides[i].classList.add("active");
  }, 8000);
}


d.addEventListener("DOMContentLoaded", (e) => {

  slider();

});
