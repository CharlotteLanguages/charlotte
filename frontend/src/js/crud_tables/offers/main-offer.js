import { editor } from "./offers.js";
import {
  alertManager,
  openModalDelete,
  closeWindowModal,
  showSideBar,
} from "../generalCode/generalCode.js";

const d = document,
  API_URL = `https://apicharlotte.up.railway.app/promotions`,
  API_COURSE = `https://apicharlotte.up.railway.app/course`,
  API_URL2 = `https://apicharlotte.up.railway.app/course`,
  wrapper = d.querySelector(".wrapper"),
  $formOffer = d.querySelector(".crud-form-promotion"),
  $titleOffer = d.querySelector(".crud-title-promotion"),
  $btnOffer = d.getElementById("create-promotion"),
  $tableOffer = d.querySelector(".crud-table-promotion"),
  activity = d.querySelector(".table-promotion"),
  $modal = document.querySelector(".cont-p-promotion"),
  $formDelete = d.querySelector(".form-delete-dr"),
  $fragmentOffer = d.createDocumentFragment();

/*-------------------------------------------------------------------------------------------------- */

function ModalShowPromotions(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-promotion");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-promotion");
    }
  });
}

/*------------------------------------------------------------------------------------------------------------- */

function openFormPromotions(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
      setCurrentDate();
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }

    if (e.target.matches(btnclose)) {
      load();
      $formOffer.reset();
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
  });
}

/*------------------------------------------------------------------------------ */

function setCurrentDate() {
  let currentDate = new Date(),
    currentDay = currentDate.getDate(),
    monthNumber = currentDate.getMonth() + 1,
    currentYear = currentDate.getFullYear();
  /* año = currentDate.toLocaleString(),
        año1 = currentDate.toLocaleDateString(),
        año2 = currentDate.toLocaleTimeString(); */
  if (monthNumber < 10) monthNumber = `0${monthNumber}`;
  if (currentDay < 10) currentDay = `0${currentDay}`;
  d.querySelector(".input-DateEnd-promotion").setAttribute(
    "min",
    `${currentYear}-${monthNumber}-${currentDay}T00:00`
  );
  d.querySelector(".input-DateStart-promotion").setAttribute(
    "min",
    `${currentYear}-${monthNumber}-${currentDay}T00:00`
  );
}

/*--------------------------------------------------------------------------------------------------- */

function showSortedDate() {
  d.querySelectorAll(".dataEnd").forEach((element) => {
    const day = element.textContent.slice(0, 10).split("-").reverse().join("-");
    const hour = element.textContent.slice(11, 16);
    element.textContent = `${day} ${hour}`;
  });
}

/*---------------------------------------------------------------------------- */

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Offer Title</th>
    <th>Price</th>
    <th>Offer</th>
    <th>Date</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

/*----------------------------------------------------------------------------------------------- */

let offer = [];
const getOfferData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-promotion");
      table.innerHTML = `<div class = "no-activities">NO OFFERS YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A OFFER</div`;
      }, 4000);
    } else {
      offer = json;
      renderPromotionData(offer);
      showSortedDate();
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-promotion");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};

/*--------------------------------------------------------------------------------- */

const renderPromotionData = (prom) => {
  let codigo = "";
  prom.reverse().forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td data-label = "ID">${ele.idPromociones}</td>
    <td data-label = "Offer Title">${ele.titulo}</td>
    <td data-label = "Price">${ele.precio}</td>
    <td data-label = "Offer">${ele.oferta}</td>
    <td data-label = "Date" class = "dataEnd">${ele.dateEnd}</td>
    <td data-label = "Actions">
        <div class="icons-promotion">
        <i class="fas fa-dot-circle read-promotion" data-ids = ${ele.idPromociones}></i>
        <i class="fas fa-pen edit-promotion" data-id = ${ele.idPromociones}></i> 
        <i class="fas fa-times-circle remove-promotion" data-idr =${ele.idPromociones}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragmentOffer.appendChild($tr);
  });
  $tableOffer.innerHTML = CodeTh();
  $tableOffer.appendChild($fragmentOffer);
};

async function printCourses() {
  let input = d.querySelectorAll(".input-category-promotion");

  let res = await fetch(API_COURSE),
    json = await res.json();
  json.sort().forEach((course) => {
    input.forEach((el) => {
      el.innerHTML += `<option>${course.titulo}</option>`;
    });

    try {
    } catch (error) {}
  });
}

/*-----------------------------------------------------Btn Read show------------------------------------------- */
const openModalEditor = (e) => {
  if (e.target.matches(".read-promotion")) {
    d.querySelector("#modal-container-promotion").style.opacity = "1";
    d.querySelector("#modal-container-promotion").style.visibility = "visible";
    d.querySelector(".modal-promotion").classList.toggle("modal-clp");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      promo = {};
    offer.filter((prom) => {
      if (prom.idPromociones == id) {
        promo = prom;
      }
    });

    if (promo.promotioDescription == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${promo.promotioDescription}</div>`;
      $modal.innerHTML = codigo;
    }
  }
};

/*---------------------------------------------------------------------------------------------------- */

const openOfferEditForm = async (e) => {
  if (e.target.matches(".edit-promotion")) {
    $titleOffer.textContent = "Modify Offer";
    $btnOffer.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    setCurrentDate();

    let id = e.target.dataset.id,
      promo = {};
    offer.filter((prom) => {
      if (prom.idPromociones == id) promo = prom;
    });

    let res = await fetch(API_COURSE),
      json = await res.json();

    json.map((ele) => {
      if (promo.fk_curso == ele.idCurso) {
        $formOffer.idi.value = id;
        $formOffer.promotionTitle.value = promo.titulo;
        $formOffer.promotionPrice.value = promo.precio;
        $formOffer.promotionOffer.value = promo.oferta;
        $formOffer.promotionDateStart.value = promo.dateStart;
        $formOffer.promotionDateEnd.value = promo.dateEnd;
        d.querySelector(".span").textContent = ele.titulo;
        /* $formOffer.promotionCategory.value = ele.titulo; */
        editor.setContents(`${promo.detalles}`);
        load();
        /* getStudentData(); */
      }
    });
  }
};

/*-------------------------------------------------------------------------------------- */

d.addEventListener("submit", async (e) => {
  if (e.target === $formOffer) {
    e.preventDefault();
    let responseCourse = await fetch(API_COURSE),
      jsonCourse = await responseCourse.json(),
      options;

    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        jsonCourse.map((ele) => {
          if (e.target.course.value.trim() == ele.titulo) {
            options = {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                titulo: e.target.promotionTitle.value,
                precio: e.target.promotionPrice.value,
                oferta: e.target.promotionOffer.value,
                dateStart: e.target.promotionDateStart.value,
                dateEnd: e.target.promotionDateEnd.value,
                fk_curso: ele.idCurso,
                detalles: editor.getContents(),
              }),
            };
          }
        });

        let res = await fetch(API_URL, options),
          json = await res.json();
        getOfferData();
        load();
        $formOffer.reset();
        alertManager("success", "Created Successfully");
        d.querySelector(".tooltip").classList.remove("show_tooltip");
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
      }
    } else {
      //UPDATE -PUT
      try {
        let options;

        jsonCourse.map((ele) => {
          if (e.target.course.value.trim() == ele.titulo) {
            console.log(e.target.promotionDateStart.value)
            console.log(e.target.promotionDateEnd.value)
            options = {
              method: "PUT",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                titulo: e.target.promotionTitle.value,
                precio: e.target.promotionPrice.value,
                oferta: e.target.promotionOffer.value,
                dateStart: e.target.promotionDateStart.value,
                dateEnd: e.target.promotionDateEnd.value,
                fk_curso: ele.idCurso,
                detalles: editor.getContents(),
              }),
            };
          }
        });

        let res = await fetch(`${API_URL}/${e.target.idi.value}`, options),
          json = await res.json();

        restartFormValues(e);
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
      }
    }
  }
});

/*------------------------------------------------------- */

function restartFormValues(e) {
  load();
  getOfferData();
  alertManager("update", "Edit Successfully");
  openEditingForm("Create new offer", "Create offer");
  $formOffer.reset();
  e.target.idi.value = "";
  d.querySelector(".tooltip").classList.remove("show_tooltip");
}

/*------------------------------------------------------------------- */

function openEditingForm(title, btn) {
  $titleOffer.textContent = title;
  $btnOffer.value = btn;
}

/*----------------------------------------------------------------------------------------------------------- */

const removeOffer = (e) => {
  if (e.target.matches(".remove-promotion")) {
    openModalDelete();
    let id = e.target.dataset.idr;

    d.addEventListener("submit", async (e) => {
      if (e.target === $formDelete) {
        e.preventDefault();
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              reasonDeleteOffer: e.target.reasonDelete.value,
            }),
          },
          res = await fetch(
            "http://localhost:3000/reasonDeleteOffers",
            options
          ),
          json = await res.json();
      }

      if (e.target === $formDelete) {
        e.preventDefault();

        try {
          let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" }),
            json = await res.json();

          $formDelete.reset();
          getOfferData();
          alertManager("deleted", "Deleted Successfully");
          d.querySelector(".modal-dr").classList.toggle("modal-close-dr");

          setTimeout(() => {
            d.querySelector(".modal-container-dr").style.opacity = "0";
            d.querySelector(".modal-container-dr").style.visibility = "hidden";
          }, 700);

          setTimeout(() => {
            location.reload();
          }, 1900);
        } catch (error) {}
      }
    });
  }
};

/* -------------------------------load -----------------------------*/

function load() {
  d.querySelector(".cont-tables-promotion").classList.toggle(
    "up-table-promotion"
  );
  d.querySelector(".cont-new-promotion").classList.toggle(
    "open-form-promotion"
  );
  d.querySelector("#container-noti").classList.toggle("noticia");
}

/*------------------------------------------------------------------------------- */

const vc = d.querySelector(".cont-table-promotion_blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".fa-bell")) {
    d.querySelector(".tooltip").classList.toggle("show_tooltip");
  }
  if (e.target.matches(".nav__icon") || e.target.matches("#container")) {
    d.querySelector(".tooltip").classList.remove("show_tooltip");
  }

  if (e.target.matches(".notifications")) {
    d.querySelector(".tooltip_message").classList.toggle("show_notifications");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    d.querySelector(".open_tooltip").classList.add("fa-chevron-down");
    d.querySelector(".open_tooltip").classList.remove("fa-chevron-up");
  }
});

d.addEventListener("click", (e) => {
  openModalEditor(e);
  openOfferEditForm(e);
  showSideBar(e);
  removeOffer(e);
});

d.addEventListener("DOMContentLoaded", (e) => {
  getOfferData();
  printCourses();
  getStudentData();
});

ModalShowPromotions(
  ".fa-dot-circle",
  ".close-promotion",
  "#modal-container-promotion",
  ".modal-promotion"
);

openFormPromotions(
  ".btn-promotion",
  ".cancel-offer",
  ".cont-new-promotion",
  ".cont-tables-promotion"
);

closeWindowModal(
  ".close",
  ".modal-promotion",
  "#modal-container-promotion",
  "modal-clp"
);



let student = [];
const getStudentData = async () => {

  try {
    let res = await fetch(API_URL2),
      json = await res.json();
      student = json;
      console.log(student);
      /*  renderStudentData(student); */
       addStudent(student);

      
    } catch (err) {
        /*  const table = d.querySelector(".crud-table-student");
        table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`; */
    }
};









const selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");




function addStudent(selectedStudent){
  options.innerHTML = '';
  student.forEach(student =>{
    let isSelected = student == selectedStudent? 'selected': '';
    let li = `<li  class="${isSelected} lux">${student.idCurso}. ${student.titulo}</li>`;
    /* console.log(li) */
    options.insertAdjacentHTML("beforeend", li)
  })
  
  d.querySelectorAll(".lux").forEach((input) => {
    input.addEventListener("click", e=>{
      updateName(e.target)
      /* $formActivity.course.value = e.target.innerText.split(".")[1]
      console.log($formActivity.course.value) */
     let con = e.target.innerText.split(".")[1]
       d.querySelector(".span").textContent = con;
       $formOffer.course.value = con;

    
     /*  console.log(con)
      console.log(wrapper.querySelector("span").textContent) */
   /*   console.log(wrapper.querySelector("span").innerText.split(".")[1]) */
    });
    /* input.addEventListener("change", validateDateBirth); */
  });
}


function updateName(selectedLi){
  searchInp.value = "";
  addStudent(selectedLi.innerHTML);
  wrapper.classList.remove("active");
  selectBtn.firstElementChild.innerText = selectedLi.innerText;

}

searchInp.addEventListener("keyup", ()=>{
  let arr = [];
  let searchWord = searchInp.value.toLowerCase();
  arr = student.filter(data=>{
    return data.titulo.toLowerCase().startsWith(searchWord);
  }).map(data=>{
    let isSelected = data == selectBtn.firstElementChild.innerText? "selected": "";
    return `<li class="${isSelected} lux">${data.idCurso}. ${data.titulo}</li>`
  }).join("")
  options.innerHTML = arr ? arr: `<p style ="margin-top:10px">Oops! Student not found</p>`

  d.querySelectorAll(".lux").forEach((input) => {
    input.addEventListener("click", e=>{
      updateName(e.target)
      let con = e.target.innerText.split(".")[1]
      d.querySelector(".span").textContent = con
    });
    
  });
})

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
