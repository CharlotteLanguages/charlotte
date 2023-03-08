const d = document,
  API_URL = `http://localhost:3000/news`,
  $modal = document.querySelector(".cont-p-news");

const getHomePageData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    showNews(json);
    json.reverse().forEach((ele) => {
      const code = `
      <div class="card-news">
      <img src="/src/public/fondo-login.png" class="card-image">
      <h1 class="card-title">${ele.titleNews}</h1>
      <p class="card-paragraph">${ele.editorNews.slice(0, 350)}...</p>
      <div class="btn-dark" data-ids=${ele.id}>Read more</div>
  </div>    
        `;
      d.querySelector(".section-main").innerHTML += code;
    });
    news = json;
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

d.addEventListener("DOMContentLoaded", (e) => {
  getHomePageData();
  slider();
  closeWindowModal();
});

d.addEventListener("change", (e)=>{
  getHomePageData();
})
function showNews(news) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".btn-dark")) {
      let id = e.target.dataset.ids,
        courses = {};
      addStyles();

      news.filter((el) => {
        if (el.id == id) courses = el;
      });
      if (courses.editorNews.length < 1000) {
        d.querySelector(".modal-news").style.height = "400px";
        d.querySelector(".modal-news").style.top = "170px";
        d.querySelector(".cont-p-news").style.height = "400px";
        courses.editorNews == "<p><br></p>"
          ? ($modal.innerHTML = `<div class = "no-description">Empty section</div>`)
          : ($modal.innerHTML = `<div>${courses.editorNews}</div>`);
      } else {
        courses.editorNews == "<p><br></p>"
          ? ($modal.innerHTML = `<div class = "no-description">Empty section</div>`)
          : ($modal.innerHTML = `<div>${courses.editorNews}</div>`);
        d.querySelector(".modal-news").style.height = "800px";
        d.querySelector(".modal-news").style.top = "50px";
        d.querySelector(".cont-p-news").style.height = "785px";
      }
    }
  });
}

const addStyles = () => {
  d.querySelector("#modal-container-news").style.opacity = "1";
  d.querySelector("#modal-container-news").style.visibility = "visible";
  d.querySelector(".modal-news").classList.toggle("modal-cl");
};

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

d.addEventListener("focus", e=>{
  if(e.target ==(".slider-slides")){
    console.log("focus")
  }
})
function closeWindowModal() {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".poi")) {
      d.querySelector(".modal-news").classList.toggle("modal-cl");
      setTimeout(() => {
        d.querySelector("#modal-container-news").style.opacity = "0";
        d.querySelector("#modal-container-news").style.visibility = "hidden";
      }, 700);
    }
  });
}

window.addEventListener("load", ()=>{
  document.getElementById("loader").classList.toggle("loader2");
  setTimeout(() => {
    d.querySelector(".call-action").classList.remove("none")
    setInterval(() => {
      d.querySelector(".btn-start").style.transform = "scale(1.05)"
      setTimeout(() => {
        d.querySelector(".btn-start").style.transform = "scale(1)"
      }, 1700);
    }, 1050);

  },10000);
})

  const w = window;
  const $scrollBtn = d.querySelector(".scroll-top-btn");

  w.addEventListener("scroll", (e) => {
    let scrolltop = w.pageYOffset || d.documentElement.scrollTop; 
    if (scrolltop > 1200) {
      $scrollBtn.classList.remove("hidden");
    } else {
      $scrollBtn.classList.add("hidden");
    }
  });

  d.addEventListener("click", (e) => {
    if (e.target.matches(".scroll-top-btn")) {
      w.scrollTo({
       behavior: "smooth",
        top: 0,
      });
    }
    if (e.target.matches(".sigin")) {
     /*  window.location.href = "/src/views/login.html";
      target = "_blank"; */
    }
  });

document.querySelector(".fa-times-circle").addEventListener("click", (e)=>{
  d.querySelector(".call-action").classList.add("none")

})


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
    /* hiideInput.value = e.currentTarget.querySelector(".title").innerText; */
   /*   e.currentTarget.querySelector(".title").style.visibility = "hidden"; */

    
    
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
})




d.addEventListener("click", (e)=>{
  if(e.target.matches("#bars")){
    d.querySelector(".navbar__social-medias").classList.toggle("move_social-medias");
    d.querySelector(".navbar__menu").classList.toggle("move-menu");
    d.querySelector(".navbar").classList.toggle("top_navbar");

  }
})