const d = document;

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