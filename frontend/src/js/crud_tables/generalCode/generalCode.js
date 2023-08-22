const d = document;

export function alertManager(typeMsg, message) {
  const alert = document.querySelector("#alert"),
    me = document.querySelector(".parrafo-succes");

  me.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 2900);
}


export const openModalDelete = () => {
  d.querySelector(".modal-dr").classList.remove("modal-close-dr");
  d.querySelector(".modal-container-dr").classList.add("modal-cancel-dr");
  d.querySelector(".tooltip").classList.remove("show_tooltip");
};



/* const openWindowModal = (btn, modal, modalContainer, toggle, review, $modal, editorReview ) => {

  d.addEventListener("click", (e) => {
    if (e.target.matches(".read-review")) {
      let id = e.target.dataset.ids, sponsors = {};

      d.querySelector("#modal-container-review").style.opacity = "1";
      d.querySelector("#modal-container-review").style.visibility = "visible";
      d.querySelector(".modal-review").classList.toggle("modal-clos");
      d.querySelector(".tooltip").classList.remove("show_tooltip");
  
      review.filter((el) => {
        if (el.id == id) sponsors = el;
      });
  
      if (sponsors.editorReview == "<p><br></p>") {
        let cod = `<div class = "no-description">Empty section</div>`;
        $modal.innerHTML = cod;
      } else {
        let codigo = `<div>${sponsors.editorReview}</div>`;
        $modal.innerHTML = codigo;
      }
    }  
  });

};

 */


export const closeWindowModal = (btn, modal, modaLContainer, toggle) => {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      d.querySelector(modal).classList.toggle(toggle);
      setTimeout(() => {
        d.querySelector(modaLContainer).style.opacity = "0";
        d.querySelector(modaLContainer).style.visibility = "hidden";
      }, 700);
    }
  });
};



export const showSideBar = (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
};
