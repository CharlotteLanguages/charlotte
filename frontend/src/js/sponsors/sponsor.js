/*-----------------------------------------init const -----------------------------*/

const d = document,
  API_URL = `http://localhost:3000/sponsor`,
  $formSponsor = d.querySelector(".crud-form-sponsor"),
  $titleSponsor = d.querySelector(".crud-title-sponsor"),
  $btnSponsor = d.getElementById("create-sponsor"),
  $tableSponsor = d.querySelector(".crud-table-sponsor"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-sponsor");
const news = d.querySelector("#container-noti");



/*-------------------------------------open form---------------------------------- */

export function openFormSponsor(btnshow, btnclose, modal, table) {
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



/*---------------------------------------------------------------------------------------------------------------- */

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Sponsors</th>
    <th>Address</th>
    <th>Website</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}



/*------------------------------------------------------------------------------------------------- */


let sponsor = [];
export const getSponsorData = async () => {
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
  let codigo = "";
  sponsor.reverse().forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td  data-label = "ID">${ele.id}</td>
    <td  data-label = "Sponsors">${ele.sponsorName}</td>
    <td  data-label = "Address">${ele.sponsorAddress}</td>
    <td  data-label = "Website">${ele.sponsorWebsite}</td>
    <td  data-label = "Actions">
        <div class="icons-sponsor">
        <i class="fas fa-dot-circle read-sponsor" data-ids = ${ele.id} ></i>
        <i class="fas fa-pen edit-sponsor" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-sponsor" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragment.appendChild($tr);
  });
  $tableSponsor.innerHTML = CodeTh();
  $tableSponsor.appendChild($fragment);
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */

const openModalEditor = (e)=>{
  if (e.target.matches(".read-sponsor")) {
    d.querySelector("#modal-container-sponsor").style.opacity = "1";
    d.querySelector("#modal-container-sponsor").style.visibility = "visible";
    d.querySelector(".modal-sponsor").classList.toggle("modal-clos");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      sponsors = {};
    sponsor.filter((el) => {
      if (el.id == id) {
        sponsors = el;
      }
    });
  
    let code = `
      <div class = "refname">${sponsors.sponsorName}</div>
      <div class = "refemail">${sponsors.sponsorAddress}</div>
      <a href="http://${sponsors.sponsorWebsite}" target = "_blank" class = "refphone">${sponsors.sponsorWebsite}</a>
      <div></div>
      `;
    $modal.innerHTML = code;
  }

}

const closeModalEditor = (e)=>{
  if (e.target.matches(".close")) {
    d.querySelector(".modal-sponsor").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-sponsor").style.opacity = "0";
      d.querySelector("#modal-container-sponsor").style.visibility = "hidden";
    }, 700);
    d.querySelector(".modal-resource").classList.toggle("close-resource");
  }

}

const openSponsorEditForm = (e)=>{
  if (e.target.matches(".edit-sponsor")) {
    $titleSponsor.textContent = "Modify sponsors";
    $btnSponsor.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");
  
    let id = e.target.dataset.id,
      sponsors = {};
    sponsor.filter((el) => {
      if (el.id == id)sponsors = el;
  
    });
  
    $formSponsor.idi.value = id;
    $formSponsor.sponsorName.value = sponsors.sponsorName;
    $formSponsor.sponsorAddress.value = sponsors.sponsorAddress;
    $formSponsor.sponsorWebsite.value = sponsors.sponsorWebsite;
   d.querySelector(".file-sponsor-text").textContent = sponsors.sponsorImage;
    load();
  }
}



/*--------------------------------------------------POST Method----------------------------------------- */

/* d.addEventListener("click", (e) => {
  
  if (e.target.matches(".btn-submit")) {
    if (
      !$formSponsor["sponsorName"].value.length ||
      !$formSponsor["sponsorWebsite"].value.length
    ) {
      const value = $formSponsor["sponsorName"].value;
      const web = $formSponsor["sponsorWebsite"].value;

      $formSponsor["sponsorName"].value = "* Enter sponsor name";
      $formSponsor["sponsorWebsite"].value = "* Enter the Sponsor's Website";

      setTimeout(() => {
        $formSponsor["sponsorName"].value = value;
        $formSponsor["sponsorWebsite"].value = web;
      }, 1500);

      return;
    }
    const activity = {
      sponsorName: $formSponsor["sponsorName"].value,
      sponsorAddress: $formSponsor["sponsorAddress"].value,
      sponsorWebsite: $formSponsor["sponsorWebsite"].value,
      sponsorImage: $formSponsor["sponsorImage"].value,
    };
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(activity),
      headers: { "content-Type": "application/json" },
    })
      .then((res) => {
        res.json();
      })
      .catch((error) => {
        alertManager("error", error);
      })
      .then((res) => {
        getSponsorData();
        load();
        $formSponsor.reset();
        alertManager("success", "Created Successfully");
        d.querySelector(".file-sponsor-text").textContent = "Profile image...";
      });
  }
});
 */
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
  }, 2500);

}

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
              sponsorName: e.target.sponsorName.value,
              sponsorAddress: e.target.sponsorAddress.value,
              sponsorWebsite: e.target.sponsorWebsite.value,
              sponsorImage: e.target.sponsorImage.value,
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
              sponsorName: e.target.sponsorName.value,
              sponsorAddress: e.target.sponsorAddress.value,
              sponsorWebsite: e.target.sponsorWebsite.value,
              sponsorImage: e.target.sponsorImage.value,
            }),
          },
          res = await fetch(
            `http://localhost:3000/sponsor/${e.target.idi.value}`,
            options
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



function restartFormValues(e) {
  $btnSponsor.value = "Create sponsor";
  $titleSponsor.textContent = "Create new sponsor";
  load();
  alertManager("update", "Edit Successfully");
  $formSponsor.reset();
  e.target.idi.value = "";
  d.querySelector(".tooltip").classList.remove("show_tooltip");

 
}

/*---------------------------------------------------PUT Method---------------------------------- */

/* d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    const spon = {
      id: $formSponsor.idi.value,
      sponsorName: $formSponsor.sponsorName.value,
      sponsorAddress: $formSponsor.sponsorAddress.value,
      sponsorWebsite: $formSponsor.sponsorWebsite.value,
      sponsorImage: $formSponsor.sponsorImage.value,
    };

    if (
      !$formSponsor["sponsorName"].value.length ||
      !$formSponsor["sponsorWebsite"].value.length
    ) {
      const value = $formSponsor["sponsorName"].value;
      const web = $formSponsor["sponsorWebsite"].value;

      $formSponsor["sponsorName"].value = "* Enter sponsor name";
      $formSponsor["sponsorWebsite"].value = "* Enter the Sponsor's Website";

      setTimeout(() => {
        $formSponsor["sponsorName"].value = value;
        $formSponsor["sponsorWebsite"].value = web;
      }, 1500);

      return;
    }

    fetch(`${API_URL}/${spon.id}`, {
      method: "PUT",
      body: JSON.stringify(spon),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        alertManager("error", error);
      })
      .then((response) => {
        $btnSponsor.value = "Add new sponsor";
        load();
        alertManager("update", "Edit Successfully");
        document.querySelector(".crud-form-sponsor").reset();
        $btnSponsor.classList.toggle("edit-two");
        $btnSponsor.classList.toggle("btn-submit");
        $titleSponsor.textContent = "Create new sponsor";
      });
  }
});
 */
/*--------------------------------------------Load----------------------------------- */

function load() {
  getSponsorData();
  d.querySelector(".cont-new-sponsor").classList.toggle("open-form-sponsor");
  d.querySelector(".cont-tables-sponsor").classList.toggle("up-table-sponsor");
  news.classList.toggle("noticia");
}
/* -------------------------------------------------DELETE Method-------------------------------- */
 const removeSponsor = (e)=>{
   if (e.target.matches(".remove-sponsor")) {
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
             getSponsorData();
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


const vc = d.querySelector(".cont-table-sponsor_blue"),
  vd = d.querySelector(".cont-tables-sponsor");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});

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
  openModalEditor(e);
  closeModalEditor(e);
  showSideBar(e);
  openSponsorEditForm(e);
  removeSponsor(e);
});