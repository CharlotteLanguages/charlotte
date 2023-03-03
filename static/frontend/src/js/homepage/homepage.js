const d = document,
  API_URL = `http://localhost:3000/news`,
  $modal = document.querySelector(".cont-p-news");

const getNewsData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    showNews(json);
    json.forEach((ele) => {
      const code = `
      <div class="card-news">
      <img src="/src/public/fondo-login.png" alt="" class="card-image">
      <h1 class="card-title">${ele.titleNews}</h1>
      <p class="card-text">${ele.editorNews.slice(0, 400)}</p>
      <div href="" class="btn-dark" data-ids=${ele.id}>Read</div>
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
  getNewsData();
  slider();
  closeWindowModal();
});

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
