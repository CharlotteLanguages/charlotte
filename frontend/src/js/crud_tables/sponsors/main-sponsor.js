import {alertManager, openModalDelete,closeWindowModal,showSideBar,} from "../generalCode/generalCode.js";
import { headTable, bodyTable } from "./sponsor.js";

/*-----------------------------------------init const -----------------------------*/

const d = document,
  API_URL = `https://apicharlotte.up.railway.app/sponsor`,
  $formSponsor = d.querySelector(".crud-form-sponsor"),
  $titleSponsor = d.querySelector(".crud-title-sponsor"),
  $btnSponsor = d.getElementById("create-sponsor"),
  $tableSponsor = d.querySelector(".crud-table-sponsor"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-sponsor");
const news = d.querySelector("#container-noti");

/*-------------------------------------open form---------------------------------- */

function openFormSponsor(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      load();
      $formSponsor.reset();
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
    if (e.target.matches(btnclose)) {
      load();
      $formSponsor.reset();
      d.querySelector(".file-sponsor-text").textContent = "Profile image...";
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
  });
}

/*------------------------------------------------------------------------------------------------- */

let sponsor = [];
const getSponsorData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-sponsor");
      table.innerHTML = `<div class = "no-activities">NO SPONSORS YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A SPONSOR</div`;
      }, 4000);
    } else {
      sponsor = json;
      renderSponsor(sponsor);
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-sponsor");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};

/*--------------------------------------------Render Resources-------------------------------- */
const renderSponsor = (sponsor) => {
  sponsor.reverse().forEach((ele) => {
    const $tr = d.createElement("tr");
    $tr.innerHTML = bodyTable(ele);
    $fragment.appendChild($tr);
  });
  $tableSponsor.innerHTML = headTable();
  $tableSponsor.appendChild($fragment);
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */

const openModalEditor = (e) => {
  if (e.target.matches(".read-sponsor")) {
    d.querySelector("#modal-container-sponsor").style.opacity = "1";
    d.querySelector("#modal-container-sponsor").style.visibility = "visible";
    d.querySelector(".modal-sponsor").classList.toggle("modal-clos");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      sponsors = {};
    sponsor.filter((el) => {
      if (el.idPatrocinador == id) {
        sponsors = el;
      }
    });

    let code = `
      <div class = "refname">${sponsors.nombre}</div>
      <div class = "refemail">${sponsors.direccion}</div>
      <a href="http://${sponsors.webSite}" target = "_blank" class = "refphone">${sponsors.webSite}</a>
      <div></div>
      `;
    $modal.innerHTML = code;
  }
};

const openSponsorEditForm = (e) => {
  if (e.target.matches(".edit-sponsor")) {
    $titleSponsor.textContent = "Modify sponsors";
    $btnSponsor.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");

    let id = e.target.dataset.id,
      sponsors = {};
    sponsor.filter((el) => {
      if (el.idPatrocinador == id) sponsors = el;
    });

    $formSponsor.idi.value = id;
    $formSponsor.sponsorName.value = sponsors.nombre;
    $formSponsor.sponsorAddress.value = sponsors.direccion;
    $formSponsor.sponsorWebsite.value = sponsors.webSite;
    d.querySelector(".file-sponsor-text").textContent = sponsors.image;
    load();
  }
};

/*-----------------------------------------------------Btn Edit Up Modify----------------------------------------- */

d.addEventListener("submit", async (e) => {
  if (e.target === $formSponsor) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              nombre: e.target.sponsorName.value,
              direccion: e.target.sponsorAddress.value,
              webSite: e.target.sponsorWebsite.value,
              image: e.target.sponsorImage.value,
            }),
          },
          res = await fetch(API_URL, options),
          json = await res.json();
        getSponsorData();
        load();
        $formSponsor.reset();
        alertManager("success", "Created Successfully");
        d.querySelector(".file-sponsor-text").textContent = "Profile image...";
        d.querySelector(".tooltip").classList.remove("show_tooltip");
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
      }
    } else {
      //UPDATE -PUT
      try {
        let options = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              nombre: e.target.sponsorName.value,
              direccion: e.target.sponsorAddress.value,
              webSite: e.target.sponsorWebsite.value,
              image: e.target.sponsorImage.value,
            }),
          },
          res = await fetch(`${API_URL}/${e.target.idi.value}`, options),
          json = await res.json();
        restartFormValues(e);
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
      }
    }
  }
});

function restartFormValues(e) {
  $btnSponsor.value = "Create sponsor";
  $titleSponsor.textContent = "Create new sponsor";
  load();
  alertManager("update", "Edit Successfully");
  $formSponsor.reset();
  e.target.idi.value = "";
  d.querySelector(".tooltip").classList.remove("show_tooltip");
}

/*--------------------------------------------Load----------------------------------- */

function load() {
  getSponsorData();
  d.querySelector(".cont-new-sponsor").classList.toggle("open-form-sponsor");
  d.querySelector(".cont-tables-sponsor").classList.toggle("up-table-sponsor");
  news.classList.toggle("noticia");
}

/* -------------------------------------------------DELETE Method-------------------------------- */

const removeSponsor = (e) => {
  if (e.target.matches(".remove-sponsor")) {
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
                body: JSON.stringify({
                  reasonDeleteSponsors: e.target.reasonDelete.value,
                }),
              },
              res = await fetch(
                "http://localhost:3000/reasonDeleteSponsors",
                options
              ),
              json = await res.json();
          } catch (error) {
            console.log("reason not added");
          }

          try {
            let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" }),
              json = await res.json();

            $formDelete.reset();
            getSponsorData();
            alertManager("deleted", "Deleted Successfully");
            d.querySelector(".modal-dr").classList.add("modal-close-dr");

            setTimeout(() => {
              d.querySelector(".modal-container-dr").classList.remove(
                "modal-cancel-dr"
              );
            }, 700);
            id = 0;
          } catch (error) {
            console.log("could not delete");
          }
        }
      }
    });

    d.addEventListener("click", (e) => {
      if (e.target.matches(".btn-dr2")) {
        $formDelete.reset();
        d.querySelector(".modal-dr").classList.add("modal-close-dr");
        setTimeout(() => {
          d.querySelector(".modal-container-dr").classList.remove(
            "modal-cancel-dr"
          );
        }, 700);
        id = 0;
      }
    });
  }
};

/*--------------------------------------------------------------------------------------------------- */
const files = d.querySelectorAll("#imgSponsor");
Array.from(files).forEach((file) => {
  file.addEventListener("change", (e) => {
    const span = d.querySelector(".file-sponsor-text");
    if (file.files.length == 0) {
      span.innerHTML = "No file selected";
    } else if (file.files.length > 1) {
      /*   span.innerHTML = file.files[0].name; */
      span.innerHTML = file.files.length + " Selected files";
    } else {
      span.innerHTML = file.files[0].name;
    }
  });
});

/*--------------------------------------------------------------------------------------------- */

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
  showSideBar(e);
  openSponsorEditForm(e);
  removeSponsor(e);
});

d.addEventListener("DOMContentLoaded", (e) => {
  getSponsorData();
});

openFormSponsor(
  ".btn-sponsor",
  ".cancel-sponsor",
  ".cont-new-sponsor",
  ".cont-tables-sponsor"
);

closeWindowModal(
  ".close",
  ".modal-sponsor",
  "#modal-container-sponsor",
  "modal-clos"
);
