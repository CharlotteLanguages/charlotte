import {alertManager, showSideBar,openModalDelete, closeWindowModal} from "../generalCode/generalCode.js";
import { editor } from "./editor.js";
import { bodyTable, headTable } from "./membership.js";

const d = document,
  API_URL = `https://apicharlotte.up.railway.app/membership`,
  ApiReasonDelete = `http://localhost:3000/reasonDeleteMemberships`,
  $formMember = d.querySelector(".crud-form-member"),
  $titleMember = d.querySelector(".crud-title-member"),
  $btnMember = d.getElementById("create-member"),
  $tableMember = d.querySelector(".crud-table-member"),
  activity = d.querySelector(".table-member"),
  $modal = document.querySelector(".cont-p-member"),
  $formDelete = d.querySelector(".form-delete-dr"),
  $fragmentMember = d.createDocumentFragment();


/*------------------------------------------------------------------------------------------ */

export function openFormMember(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
      $formMember.reset();
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
    if (e.target.matches(btnclose)) {
      load();
      $formMember.reset();
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
  });
}

/*-------------------------------------------------------------------------------------------------- */

let membership = [];
export const getMembershipData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-member");
      table.innerHTML = `<div class = "no-activities">NO MEMBERSHIPS YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A MEMBERSHIP</div`;
      }, 4000);
    } else {
      membership = json;
      renderMember(membership);
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-member");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};

/*------------------------------------------------------------------------------------------------------------------ */


const renderMember = (membe) => {

  membe.reverse().forEach((ele) => {
    const $tr = d.createElement("tr");
  
    $tr.innerHTML = bodyTable(ele);
    $fragmentMember.appendChild($tr);
  });
  $tableMember.innerHTML = headTable();
  $tableMember.appendChild($fragmentMember);
};


/*-----------------------------------------------------Btn Read show------------------------------------------- */

const openModalEditor = (e)=>{
  if (e.target.matches(".read-member")) {
    d.querySelector("#modal-container-member").style.opacity = "1";
    d.querySelector("#modal-container-member").style.visibility = "visible";
    d.querySelector(".modal-member").classList.toggle("modal-clm");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      members = {};
    membership.filter((el) => {
      if (el.idMembership == id) members = el;
      
    });
    members.detalles == "<p><br></p>"
    ? ($modal.innerHTML =  `<div class = "no-description">Empty section</div>`)
    : ($modal.innerHTML =  `<div>${members.detalles}</div>`)
 
  }

}



/*----------------------------------------------------------------- */
const openMembershipEditForm=(e)=>{
  if (e.target.matches(".edit-member")) {
    $titleMember.textContent = "Modify Membership";
    $btnMember.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");

    let id = e.target.dataset.id,
      member = {};
      console.log(membership)
    membership.filter((memb) => {
      if (memb.idMembership == id) {
        member = memb;
      }
    });

    $formMember.idi.value = member.idMembership;
    $formMember.memberName.value = member.afiliacion;
    $formMember.memberPrice.value = member.precio;
    $formMember.memberCategory.value = member.categoria;
    editor.setContents(`${member.detalles}`);
    load();
  }
}


/*--------------------------------POST ana PUT METHOD */

d.addEventListener("submit", async (e) => {
  if (e.target === $formMember) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { 
              "Content-type": "application/json" },
            body: JSON.stringify({
              afiliacion: e.target.memberName.value,
              categoria:e.target.memberCategory.value,
              precio: e.target.memberPrice.value,
              detalles: editor.getContents(),
              
            }),
          },

        res = await fetch(API_URL, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        getMembershipData();
        load();
        $formMember.reset();
        alertManager("success", "Created Successfully");
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
              afiliacion: e.target.memberName.value,
              categoria:e.target.memberCategory.value,
              precio: e.target.memberPrice.value,
              detalles: editor.getContents(),
            }),
          },
          res = await fetch(
           `${API_URL}/${e.target.idi.value}`, options
          ),
          json = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        restartFormValues(e);
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
      }
    }
  }
});


/*------------------------------------------------------------- */

function restartFormValues(e){
  $btnMember.value = "Create membership";
  $titleMember.textContent = "Create new membership";
  load();
  alertManager("update", "Edit Successfully");
  $formMember.reset();
  e.target.idi.value = "";
  getMembershipData();
  d.querySelector(".tooltip").classList.remove("show_tooltip");
}


/*------------------------------------------------------------------ */
const removeMembership = (e) => {
  if (e.target.matches(".remove-member")) {
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
                body: JSON.stringify({ reasonDeleteMembership: e.target.reasonDelete.value}
                  )},
              res = await fetch(ApiReasonDelete,options),
              json = await res.json();

          } catch (error) {console.log("reason not added")}


          try {
            let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" }),
              json = await res.json();

            $formDelete.reset();
            getMembershipData();
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



/* const removeMembership = (e) => {
  if (e.target.matches(".remove-member")) {
    openModalDelete();
    let id = e.target.dataset.idr;

    d.addEventListener("submit", async (e) => {
      if (e.target === $formDelete) {
        e.preventDefault();
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              reasonDeleteMembership: e.target.reasonDelete.value,
            }),
          },
          res = await fetch("https://apicharlotte.up.railway.app/membership", options),
          json = await res.json();
      }
      
      
      if (e.target === $formDelete) {
        e.preventDefault();
        try {
          let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" }),
          json = await res.json();
          
          $formDelete.reset();
          getMembershipData();
          alertManager("deleted", "Deleted Successfully");
          d.querySelector(".modal-dr").classList.toggle("modal-close-dr");

          setTimeout(() => {
            d.querySelector(".modal-container-dr").style.opacity = "0";
            d.querySelector(".modal-container-dr").style.visibility = "hidden";
          }, 700);
          
          setTimeout(() => {
          location.reload();
        }, 1900);
        } catch (error) { 
        }     
      } 
    });
  }
};
 */


/*------------------------------------------------------------------------------------------------ */


function load() {
  d.querySelector(".cont-tables-member").classList.toggle("up-table-member");
  d.querySelector(".cont-new-member").classList.toggle("open-form-member");
  d.querySelector("#container-noti").classList.toggle("noticia");
}


/*--------------------------------------------------------------------------------------- */
const vc = d.querySelector(".cont-table-member_blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});


/*---------------------------------------------------------------------------------------------- */

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


/*-------------------------------------------------------------------------------- */

d.addEventListener("click", (e) => {
  openModalEditor(e);
  openMembershipEditForm(e)
  removeMembership(e);
  showSideBar(e);
});


d.addEventListener("DOMContentLoaded", (e) => {
  getMembershipData();
});

openFormMember(
  ".btn-member",
  ".cancel-member",
  ".cont-new-member",
  ".cont-tables-member"
);

closeWindowModal(".close", ".modal-member","#modal-container-member", "modal-clm");
// no se puede eliminar por un llave foranea