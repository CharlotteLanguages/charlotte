import { editor } from "./editor.js";
import { headTable, commetss, bodyTable } from "./review.js";
import {alertManager, openModalDelete, closeWindowModal,showSideBar,} from "../generalCode/generalCode.js";

/*-----------------------------------------init const -----------------------------*/

const d = document,
  ApiUrl = `http://localhost:3000/reviews`,
  ApiReasonDelete = `http://localhost:3000/reasonDeleteReviews`,
  $formReview = d.querySelector(".crud-form-review"),
  $titleReview = d.querySelector(".crud-title-review"),
  $btnReview = d.getElementById("create-review"),
  $tableReview = d.querySelector(".crud-table-review"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-review");
const news = d.querySelector("#container-noti");

/*--------------------------------------------------open form---------------------------------- */

function openFormReview(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      load();
      $formReview.reset();
      editor.setContents(``);
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".btn-published").classList.add("btn-published-visible");
      d.querySelector(".btn-inList").classList.add("btn-inList-visible");
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
    if (e.target.matches(btnclose)) {
      load();
      $formReview.reset();
      d.querySelector(".btn-published").classList.remove("btn-published-visible");
      d.querySelector(".btn-inList").classList.remove("btn-inList-visible");
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
  });
}

/**----------------------------------------------------------get Data------------------------------- */
let review = [];
const getReviewData = async () => {
  try {
    let res = await fetch(ApiUrl),
      json = await res.json();

    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-review");
      table.innerHTML = `<div class = "no-activities">NO REVIEW YET</div>`;

      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A REVIEW</div`;
      }, 4000);

    } else {
      review = json;
      renderReview(review);
      showInlist(review);
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-review");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};




const openWindowModal = () => {

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





/*------------------------------------------------------------------------------------ */

const renderReview = (reviews) => {

  reviews.reverse().forEach((ele) => {
    const $tr = d.createElement("tr");
    $tr.innerHTML = bodyTable(ele);
    $fragment.appendChild($tr);
  });
  $tableReview.innerHTML = headTable();
  $tableReview.appendChild($fragment);
};


/**------------------------------------------------------------------------------------------------- */
const contComments = d.querySelector("#cont-comments");
function showInlist(msg) {
  let commets = "";
  msg.forEach((comment) => {
    commets += commetss(comment);
  });
  contComments.innerHTML = commets;
}

/*----------------------------------------------------------------------------------------------*/
function params(e){
  return{ 
    titleReview: e.target.titleReview.value,
    mentionReview: e.target.mentionReview.value,
    typeReview: e.target.typeReview.value,
    authorReview: e.target.authorReview.value,
    editorReview: editor.getContents(),}
}


d.addEventListener("submit", async (e) => {
  if (e.target === $formReview) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify(params(e)
            )},

          res = await fetch(ApiUrl, options),
          json = await res.json();
          restartFormValues();
          alertManager("success", "Created Successfully");

      } catch (err) {let message = err.statusText || "ocurrió un Error";}
      
    } else {
      //UPDATE -PUT
      try {
        let options = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(params(e))
          },

        res = await fetch(`${ApiUrl}/${e.target.idi.value}`, options),
        json = await res.json();
        restartFormValues();
        alertManager("update", "Edit Successfully");
        openEditingForm("Create new review", "Create review");
        e.target.idi.value = "";

      } catch (err) {let message = err.statusText || "ocurrió un Error"}
    }
  }
});

/*---------------------------------------------------------------------------- */

function restartFormValues() {
  load();
  $formReview.reset();
  d.querySelector(".btn-published").classList.remove("btn-published-visible");
  d.querySelector(".btn-inList").classList.remove("btn-inList-visible");
  d.querySelector(".tooltip").classList.remove("show_tooltip");
}

/*------------------------------------------------ --------------------------------------------- */

function openEditingForm(title, btn) {
  $titleReview.textContent = title;
  $btnReview.value = btn;
}

/*---------------------------------------------------------------------------------------------- */

const openReviewEditForm = (e) => {
  let id = e.target.dataset.id, reviews = {};

  if (e.target.matches(".edit-review")) {
    openEditingForm("Modify review", "Save Changes");
    d.querySelector(".btn-published").classList.add("btn-published-visible");
    d.querySelector(".btn-inList").classList.add("btn-inList-visible");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    d.querySelector("#alert").style.display = "none";
    review.filter((el) => {
      if (el.id == id) reviews = el;
    });

    $formReview.idi.value = id;
    $formReview.titleReview.value = reviews.titleReview;
    $formReview.mentionReview.value = reviews.mentionReview;
    $formReview.typeReview.value = reviews.typeReview;
    $formReview.authorReview.value = reviews.authorReview;
    editor.setContents(`${reviews.editorReview}`);
    load();
  }
};

/*--------------------------------------------Load----------------------------------- */

function load() {
  getReviewData();
  d.querySelector(".cont-new-review").classList.toggle("open-form-review");
  d.querySelector(".cont-tables-review").classList.toggle("up-table-review");
  news.classList.toggle("noticia");
}

/* -------------------------------------------------DELETE Method-------------------------------- */

const removeReview = (e) => {
  if (e.target.matches(".remove-review")) {
    let id = e.target.dataset.idr;
    openModalDelete();

    d.addEventListener("submit", async (e) => {
      if (e.target === $formDelete) {
        if (id !== 0) {
          e.preventDefault();

          try {
            let options = {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ reasonDeleteReview: e.target.reasonDelete.value}
                  )},
              res = await fetch(ApiReasonDelete,options),
              json = await res.json();

          } catch (error) {console.log("reason not added")}


          try {
            let res = await fetch(`${ApiUrl}/${id}`, { method: "DELETE" }),
              json = await res.json();

            $formDelete.reset();
            getReviewData();
            alertManager("deleted", "Deleted Successfully");
            d.querySelector(".modal-dr").classList.add("modal-close-dr");

            setTimeout(() => {
            d.querySelector(".modal-container-dr").classList.remove("modal-cancel-dr");
            }, 700);
            id = 0;

          } catch (error) {console.log("could not delete");}
        }
      }
    });

    d.addEventListener("click", (e) => {
      if (e.target.matches(".btn-dr2")) {
        $formDelete.reset();
        d.querySelector(".modal-dr").classList.add("modal-close-dr");

        setTimeout(() => {
          d.querySelector(".modal-container-dr").classList.remove("modal-cancel-dr");
        }, 700);
        id = 0;
      }
    });
  }
};

/*--------------------------------------------------------------------------------------------------------------- */

d.addEventListener("click", (e) => {
  openReviewEditForm(e);
  removeReview(e);
  showSideBar(e);
});

d.addEventListener("DOMContentLoaded", (e) => {
  getReviewData();
});

openFormReview(".btn-review", ".cancel-review", ".cont-new-review", ".cont-tables-review");
closeWindowModal(".close", ".modal-review","#modal-container-review", "modal-clos");
openWindowModal();