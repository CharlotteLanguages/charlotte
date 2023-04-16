/*-----------------------------------------init const -----------------------------*/

const d = document,
  API_URL = `http://localhost:3000/referral`,
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
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "Referrals">${ele.referralName}</td>
    <td data-label = "Email">${ele.referralEmail}</td>
    <td data-label = "Phone">${ele.referralPhone}</td>
    <td data-label = "Actions">
        <div class="icons-referral">
        <i class="fas fa-dot-circle read-referral" data-ids = ${ele.id} ></i>
        <i class="fas fa-pen edit-referral" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-referral" data-idr =${ele.id}></i>
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

const openWindowModal = (e)=>{
  if (e.target.matches(".read-referral")) {
    d.querySelector("#modal-container-referral").style.opacity = "1";
    d.querySelector("#modal-container-referral").style.visibility = "visible";
    d.querySelector(".modal-referral").classList.toggle("modal-clos");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      referrals = {};
    referral.filter((el) => {
      if (el.id == id) referrals = el;
      
    });
  
    let code = `
      <div class = "refname">${referrals.referralName}</div>
      <div class = "refemail">${referrals.referralEmail}</div>
      <div = class = "refphone" >${referrals.referralPhone}</div>
      `;
    $modal.innerHTML = code;
  }
}

/*----------------------------------------------------------------------------------------------------------------- */

const closeWindowModal = (e)=>{
  if (e.target.matches(".close")) {
    d.querySelector(".modal-referral").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-referral").style.opacity = "0";
      d.querySelector("#modal-container-referral").style.visibility = "hidden";
    }, 700);
    
  }
}

/*------------------------------------------------------------------------------------------------------ */

const openReferralEditForm = (e)=>{
  if (e.target.matches(".edit-referral")) {
    $titleReferral.textContent = "Modify Referrals";
    $btnReferral.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.id,
      referrals = {};
    referral.filter((ref) => {
      if (ref.id == id) referrals = ref
    });
  
    $formReferral.idi.value = id;
    $formReferral.referralName.value = referrals.referralName;
    $formReferral.referralEmail.value = referrals.referralEmail;
    $formReferral.referralPhone.value = referrals.referralPhone;
    load();
  }

}




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
              referralName: e.target.referralName.value,
              referralEmail: e.target.referralEmail.value,
              referralPhone: e.target.referralPhone.value,
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
              referralName: e.target.referralName.value,
              referralEmail: e.target.referralEmail.value,
              referralPhone: e.target.referralPhone.value,
            }),
          },
          res = await fetch(
            `${API_URL}/${e.target.idi.value}`,options),
          json = await res.json();
            restartFormValues(e)
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


/*---------------------------------------------------AlertManager------------------------------------------ */

function alertManager(typeMsg, message) {
  const alert = document.querySelector("#alert"),
    me = document.querySelector(".parrafo-succes");

  me.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 1500);

}

/*-----------------------------------------------------Btn Edit Up Modify----------------------------------------- */

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

const removeReferral = (e)=>{
  if (e.target.matches(".remove-referral")) {
    d.querySelector("#modal-container-dr").style.opacity = "1";
    d.querySelector("#modal-container-dr").style.visibility = "visible";
    d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.idr;
    d.addEventListener("submit", (e) => {
      if (e.target === $formDelete) {
        e.preventDefault();
  
        fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .catch((error) => {
            alertManager("error", error);
          })
          .then((res) => {
            d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
            setTimeout(() => {
              d.querySelector("#modal-container-dr").style.opacity = "0";
              d.querySelector("#modal-container-dr").style.visibility =
                "hidden";
            }, 700);
            getReferralData();
            alertManager("deleted", "Deleted Successfully");
            $formDelete.reset();
            setTimeout(() => {
              location.reload();
            }, 1500);
          });
      }
    });
  }

}


const vc = d.querySelector(".cont-table-referral_blue"),
  vd = d.querySelector(".cont-tables-referral");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});



const showSideBar = (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".fa-bell") ){
    d.querySelector(".tooltip").classList.toggle("show_tooltip");
  }
  if (e.target.matches(".nav__icon") || e.target.matches("#container") ) {
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
  closeWindowModal(e);
  openReferralEditForm(e)
  showSideBar(e);
  removeReferral(e);
  
});