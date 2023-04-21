const d = document,
  API_URL = `http://localhost:3000/news`,
  $modal = document.querySelector(".cont-p-news");
  const noticia = [{
    titleNews:"Welcome to Charlotte Languages Center",
    editorNews: `
    <div class = "new-noticia">
    <p>Dear language learners,</p>
    <p>We are excited to announce the launch of the Charlotte Languages Center, a new online language academy opening its virtual doors this April!</p>
    <p>At the Charlotte Languages Center, we are dedicated to providing high-quality language education to the Charlotte community. Our experienced and passionate instructors are committed to helping you achieve your language learning goals, whether you are a beginner or an advanced student.
    </p>
    <p>We believe that language learning is a journey that should be fun, engaging, and rewarding. That's why we offer a wide range of courses in English designed to meet the needs of students of all ages and levels. Our curriculum is tailored to help you develop the skills you need to communicate effectively in real-life situations, and to deepen your understanding of different cultures and ways of life.</p>
    <p>
    Our courses are designed to be interactive and engaging, with plenty of opportunities for practice and feedback. We use a communicative approach that emphasizes real-life situations and contexts, so you can start using your new language skills right away.
    </p>
    <p>But the Charlotte Languages Center is more than just a language school - it's a community of learners and teachers who are passionate about language and culture. We believe that language learning is a journey that should be shared with others, and we encourage our students to connect with each other and with our instructors through a variety of social events and activities.</p>
    <p>So if you're looking to learn a new language, or to improve your existing skills, we invite you to join us at the Charlotte Languages Center. Our launch event will take place on Saturday, April 2nd, from 11 am to 3 pm. During the event, you will have the opportunity to tour our new facility, meet our instructors, and learn more about our courses.</p>
    <p>To RSVP for the launch event or to learn more about our courses, please visit our website at www.charlottelanguages.com or email us at info@charlottelanguages.com.</p>
    <p>We can't wait to meet you and share our passion for language and culture with you!</p>
    <p>Sincerely,</p>
    <p>Charlotte Languages Center team</p>
    </div>


    `,
    id: 1
  }]

const getHomePageData = async () => {
  try {
   /*  let res = await fetch(API_URL),
      json = await res.json();json.reverse() */

      if(noticia.length==1){
        d.querySelector(".section-main").style.gridTemplateColumns = "repeat(1, 1fr)";
/*         d.querySelector(".card-news").style.width = "90%";
        d.querySelector(".card-news").style.margin = "auto"; */
      }
      if(noticia.length==2){
        d.querySelector(".section-main").style.gridTemplateColumns = "repeat(2, 1fr)"
      }
    showNews(noticia);
    noticia.reverse().forEach((ele) => {
      const code = `
      <div class="card-news">
      <img src="https://image.shutterstock.com/image-vector/welcome-letters-banner-on-blue-260nw-1189574716.jpg" class="card-image">
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
        newss = {};
      addStyles();

      news.filter((el) => {
        if (el.id == id) newss = el;
      });
      if (newss.editorNews.length < 1000) {
    /*     d.querySelector(".modal-news").style.height = "400px";
        d.querySelector(".modal-news").style.top = "170px";
        d.querySelector(".cont-p-news").style.height = "400px"; */
        newss.editorNews == "<p><br></p>"
          ? ($modal.innerHTML = `<div class = "no-description">Empty section</div>`)
          : ($modal.innerHTML = `<div>${newss.editorNews}</div>`);
      } else {
        newss.editorNews == "<p><br></p>"
          ? ($modal.innerHTML = `<div class = "no-description">Empty section</div>`)
          : ($modal.innerHTML = `<div>${newss.editorNews}</div>`);
    /*     d.querySelector(".modal-news").style.height = "600px";
        d.querySelector(".modal-news").style.top = "50px";
        d.querySelector(".cont-p-news").style.height = "785px"; */
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
  language();
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
    /*   window.location.href = "/src/views/login/login.html"; */
      target = "_blank";
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
  if(e.target.matches(".portugues") || e.target.matches("#brasil")){
    window.location.href = "/src/views/homepage/homepagePt.html"
  }
  if(e.target.matches(".español") || e.target.matches("#spain") ){
    window.location.href = "/src/views/homepage/homepageEs.html"
  }
  if(e.target.matches(".frances") || e.target.matches("#france")){
    window.location.href = "/src/views/homepage/homepageFra.html"
  }
  if(e.target.matches(".ingles") || e.target.matches("#eeuu")){
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



function language(){
  let lang = document.documentElement.getAttribute("lang"),
  btn = d.querySelector(".btn-dark");
  if (lang=="es"){
    btn.textContent = "Leer más"
  }
  if (lang=="fr"){
    btn.textContent = "Lire plus"
  }
  if (lang=="pt"){
    btn.textContent = "Ler mais"
  }
  if (lang=="en"){
    btn.textContent = "Read more"
  }

}