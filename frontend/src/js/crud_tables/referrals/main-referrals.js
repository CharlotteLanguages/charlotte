import { alertManager, openModalDelete, showSideBar, closeWindowModal } from "../generalCode/generalCode.js";

const d = document,
  API_URL = `https://apicharlotte.up.railway.app/referrals`,
  $formReferral = d.querySelector(".crud-form-referral"),
  $titleReferral = d.querySelector(".crud-title-referral"),
  $btnReferral = d.getElementById("create-referral"),
  $tableReferral = d.querySelector(".crud-table-referral"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-referral");
const news = d.querySelector("#container-noti");

/*-------------------------------------open form---------------------------------- */

export function openFormReferral(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      load();
      $formReferral.reset();
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
    if (e.target.matches(btnclose)) {
      load();
      $formReferral.reset();
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
  });
}

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Referrals</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

let referral = [];

export const getReferralData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-referral");
      table.innerHTML = `<div class = "no-activities">NO REFERRALS YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A REFERRAL</div`;
      }, 4000);
    } else {
      referral = json;
      renderReferral(referral);
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-referral");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};

/*--------------------------------------------Render Resources-------------------------------- */
const renderReferral = (referral) => {
  let codigo = "";
  referral.reverse().forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td data-label = "ID">${ele.idReferidos}</td>
    <td data-label = "Referrals">${ele.referencias}</td>
    <td data-label = "Email">${ele.email}</td>
    <td data-label = "Phone">${ele.telefono}</td>
    <td data-label = "Actions">
        <div class="icons-referral">
        <i class="fas fa-dot-circle read-referral" data-ids = ${ele.idReferidos} ></i>
        <i class="fas fa-pen edit-referral" data-id = ${ele.idReferidos}></i> 
        <i class="fas fa-times-circle remove-referral" data-idr =${ele.idReferidos}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragment.appendChild($tr);
  });
  $tableReferral.innerHTML = CodeTh();
  $tableReferral.appendChild($fragment);
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */

const openWindowModal = (e) => {
  if (e.target.matches(".read-referral")) {
    d.querySelector("#modal-container-referral").style.opacity = "1";
    d.querySelector("#modal-container-referral").style.visibility = "visible";
    d.querySelector(".modal-referral").classList.toggle("modal-clos");
    
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      referrals = {};
    referral.filter((el) => {
      if (el.idReferidos == id) referrals = el;
    });

    let code = `
      <div class = "refname">${referrals.referencias}</div>
      <div class = "refemail">${referrals.email}</div>
      <div = class = "refphone" >${referrals.telefono}</div>
      `;
    $modal.innerHTML = code;
  }
};



/*------------------------------------------------------------------------------------------------------ */

const openReferralEditForm = (e) => {
  if (e.target.matches(".edit-referral")) {
    $titleReferral.textContent = "Modify Referrals";
    $btnReferral.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.id,
      referrals = {};
    referral.filter((ref) => {
      if (ref.idReferidos == id) referrals = ref;
    });

    $formReferral.idi.value = id;
    $formReferral.referralName.value = referrals.referencias;
    $formReferral.referralEmail.value = referrals.email;
    $formReferral.referralPhone.value = referrals.telefono;
    load();
  }
};

/*---------------------------------------------------------------Method Post-------------------------------*/

d.addEventListener("submit", async (e) => {
  if (e.target === $formReferral) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              referencias: e.target.referralName.value,
              email: e.target.referralEmail.value,
              telefono: e.target.referralPhone.value,
            }),
          },
          res = await fetch(API_URL, options),
          json = await res.json();
        getReferralData();
        load();
        alertManager("success", "Created Successfully");
        $formReferral.reset();
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
              referencias: e.target.referralName.value,
              email: e.target.referralEmail.value,
              telefono: e.target.referralPhone.value,
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
  load();
  getReferralData();
  alertManager("update", "Edit Successfully");
  openEditingForm("Create new referral", "Create referral");
  $formReferral.reset();
  e.target.idi.value = "";
  d.querySelector(".tooltip").classList.remove("show_tooltip");
}

function openEditingForm(title, btn) {
  $titleReferral.textContent = title;
  $btnReferral.value = btn;
}


/*--------------------------------------------Load----------------------------------- */

function load() {
  getReferralData();
  d.querySelector(".cont-new-referral").classList.toggle("open-form-referral");
  d.querySelector(".cont-tables-referral").classList.toggle(
    "up-table-resource"
  );
  news.classList.toggle("noticia");
}

  
  /* -------------------------------------------------DELETE Method-------------------------------- */
  
  
  const removeReferral = (e) => {
    if (e.target.matches(".remove-referral")) {
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
                    reasonDeleteReferral: e.target.reasonDelete.value,
                  }),
                },
                res = await fetch("http://localhost:3000/reasonDeleteReferrals",options),
                json = await res.json();
            } catch (error) {
              console.log("reason not added");
            }
      
            try {
              let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" }),
                json = await res.json();
      
              $formDelete.reset();
              getReferralData();
              alertManager("deleted", "Deleted Successfully");
              d.querySelector(".modal-dr").classList.add("modal-close-dr");
  
              setTimeout(() => {
                d.querySelector(".modal-container-dr").classList.remove("modal-cancel-dr");
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

/*-------------------------------------------------------------------------------------------- */

const vc = d.querySelector(".cont-table-referral_blue"),
  vd = d.querySelector(".cont-tables-referral");

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
  openWindowModal(e);
  openReferralEditForm(e);
  showSideBar(e);
  removeReferral(e);
});







d.addEventListener("DOMContentLoaded", (e) => {
  getReferralData();
});
/* editor(); */

openFormReferral(
  ".btn-referral",
  ".cancel-referral",
  ".cont-new-referral",
  ".cont-tables-referral"
);


closeWindowModal(".close", ".modal-referral","#modal-container-referral", "modal-clos");