/*-----------------------------------------init const -----------------------------*/

const d = document,
  API_URL = `http://localhost:3000/certificate`,
  $formCertificate = d.querySelector(".crud-form-certificate"),
  $titleCertificate = d.querySelector(".crud-title-certificate"),
  $btnCertificate = d.getElementById("create-certificate"),
  $tableCertificate = d.querySelector(".crud-table-certificate"),
  $tableCertificate2 = d.querySelector(".crud-certificate2"),
  $fragment = d.createDocumentFragment(),
  $fragment2 = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-certificate");
const news = d.querySelector("#container-noti");


/*--------------------------------------------show-----------------------*/

export function ModalShowCertificate(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-certificate");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-certificate");
    }
  });
}

/*-------------------------------------open form---------------------------------- */

export function openFormCertificate(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      load();
      $formCertificate.reset();
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".btn-certificates-badges").classList.add("btn-certificates-visible")
      d.querySelector(".btn-search").classList.add("btn-search-visible")
      d.querySelector(".file-certificate-text").textContent ="Certificate template...";
      d.querySelector(".tooltip").classList.remove("show_tooltip");


    }
    if (e.target.matches(btnclose)) {
      load();
      $formCertificate.reset();
      d.querySelector(".file-certificate-text").textContent =
        "Certificate template...";
        d.querySelector(".btn-certificates-badges").classList.remove("btn-certificates-visible")
        d.querySelector(".btn-search").classList.remove("btn-search-visible")
        d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
  });
}
/*--------------------------------------------------------------------- */


function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Certificates and Badges</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

/*-------------------------------------------------------------------------------- */

function searchp() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Name</th>
    <th>Category</th>
    <th>Type</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}


/*------------------------------------------------------------------- */

let certificate = [];
export const getCertificateData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-certificate");
      table.innerHTML = `<div class = "no-activities">NO CERTIFICATES YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A CERTIFICATE</div`;
      }, 4000);
    } else {
      certificate = json;
      renderCertificate(certificate);
      search(certificate);
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-certificate");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
    
    
  }
};

/*--------------------------------------------Render Resources-------------------------------- */
const renderCertificate = (certificate) => {
  let codigo = "";
  certificate.reverse().forEach((ele, i) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody>
    <tr>
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "Certificates and Badges">
    <div class = "cert-title" >${ele.certificateName}</div>
    <div class = "cert-text">${ele.certificateCategory}</div>
    </td>
    <td data-label = "Actions">
        <div class="icons-certificate">
        <i class="fas fa-dot-circle read-certificate" data-ids = ${ele.id} ></i>
        <i class="fas fa-pen edit-certificate" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-certificate" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragment.appendChild($tr);
  });
  $tableCertificate.innerHTML = CodeTh();
  $tableCertificate.appendChild($fragment);
};

/*---------------------------------------------------------------------------------------------------------------------------------------------- */
function search(certificate) {
  let codigo = "";
  certificate.reverse().forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tr class ="fgh">
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "Name">${ele.certificateName}</td>
    <td data-label = "Category">${ele.certificateCategory}</td>
    <td data-label = "Type">${ele.certificateType}</td>
    <td data-label = "Actions">
        <div class="icons-certificate">
        <i class="fas fa-dot-circle read-certificate" data-ids = ${ele.id} ></i>
        <i class="fas fa-times-circle remove-certificate" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>

`;
    $tr.innerHTML = codigo;
    $fragment2.appendChild($tr);
  });
  $tableCertificate2.innerHTML = searchp();
  $tableCertificate2.appendChild($fragment2);
}

/*--------------------------------------------------------------------------------------------------------------------------- */

d.addEventListener("keyup", (e) => {
  if (e.target.matches(".input-search-certific")) {
    d.querySelectorAll(".fgh").forEach((el) => {
      el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ? el.classList.remove("fiitro")
        : el.classList.add("filtro");
    });
  }
});


/*-----------------------------------------------------Btn Read show------------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-certificates-badges")) {
    //AGREGA EL COLOR BLANCO
    e.target.classList.add("style-badges2");

    // eliminar azul del contrario
    d.querySelector(".btn-search").classList.remove("style-badges2");
  
    //REMOVER LA TABLA SIGUIENTE
    d.querySelector(".cont-tables-certificate").classList.remove(
      "up-table-certificate"
    );
    //agregar table principal
    d.querySelector(".cont-certificate2").classList.add("up-certificate2");
  }



  if (e.target.matches(".btn-search")) {
    
    //agregar color blanco a este
    e.target.classList.add("style-badges2");
    
    //agregar color azul al contrario
    d.querySelector(".btn-certificates-badges").classList.add(
      "style-btn-badges"
      );

      //quitar el blanco
      d.querySelector(".btn-certificates-badges").classList.remove(
        "style-badges2"
      );

      d.querySelector(".cont-tables-certificate").classList.add(
        "up-table-certificate"
      );
    //remover
    d.querySelector(".cont-certificate2").classList.remove("up-certificate2");


  }
});



/*--------------------------------------------------------------------------------------------------------------------------- */

const openWindowModal = (e)=>{
  if (e.target.matches(".read-certificate")) {
    d.querySelector("#modal-container-certificate").style.opacity = "1";
    d.querySelector("#modal-container-certificate").style.visibility =
      "visible";
    d.querySelector(".modal-certificate").classList.toggle("modal-clos");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      certificates = {};
    certificate.filter((el) => {
      if (el.id == id) certificates = el;
      
    });
    let code = `
  
      `;
    $modal.innerHTML = code;
  }
}



/*--------------------------------------------------------------------------------------------------------------------------- */

const closeWindowModal = (e)=>{
  if (e.target.matches(".close")) {
    d.querySelector(".modal-certificate").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-certificate").style.opacity = "0";
      d.querySelector("#modal-container-certificate").style.visibility =
        "hidden";
    }, 700);
  }

}


/*-----------------------------------------------------Btn Edit Up Modify----------------------------------------- */

const openCertificatesEditForm =(e)=>{
  if (e.target.matches(".edit-certificate")) {
    $titleCertificate.textContent = "Modify certificates";
    $btnCertificate.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".btn-certificates-badges").classList.add("btn-certificates-visible")
    d.querySelector(".btn-search").classList.add("btn-search-visible")
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.id,
      sponsors = {};
    certificate.filter((el) => {
      if (el.id == id) sponsors = el;
      
    });
  
    $formCertificate.idi.value = id;
    $formCertificate.certificateName.value = sponsors.certificateName;
    $formCertificate.certificateCategory.value = sponsors.certificateCategory;
    $formCertificate.certificateType.value = sponsors.certificateType;
    let file = d.querySelector(".file-certificate-text");
    if (sponsors.certificateFile !== "") {
      file.textContent = sponsors.certificateFile;
    } else {
      file.textContent = "No file selected";
    }
  
    load();
  }

}






/*---------------------------------------------------------------Method Post-------------------------------*/


d.addEventListener("submit", async (e) => {
  if (e.target === $formCertificate) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
      certificateName: e.target.certificateName.value,
      certificateCategory: e.target.certificateCategory.value,
      certificateType: e.target.certificateType.value,
      certificateFile: e.target.certificateFile.value,
            }),
          },
          res = await fetch(API_URL, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
          getCertificateData();
          load();
          alertManager("success", "Created Successfully");
          $formCertificate.reset();
          d.querySelector(".file-certificate-text").textContent ="Profile image...";
          d.querySelector(".btn-certificates-badges").classList.remove("btn-certificates-visible")
          d.querySelector(".btn-search").classList.remove("btn-search-visible")
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
              certificateName: e.target.certificateName.value,
              certificateCategory: e.target.certificateCategory.value,
              certificateType: e.target.certificateType.value,
              certificateFile: e.target.certificateFile.value,
            }),
          },
          res = await fetch(
            `${API_URL}/${e.target.idi.value}`,
            options
          ),
          json = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
            restartFormValues(e)
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
       
      }
    }
  }
  function restartFormValues(e) {
    load();
    getCertificateData();
    alertManager("update", "Edit Successfully");
    openEditingForm("Create certification / Badges", "Create new");
    $formCertificate.reset();
    e.target.idi.value = "";
    d.querySelector(".btn-certificates-badges").classList.remove("btn-certificates-visible")
    d.querySelector(".btn-search").classList.remove("btn-search-visible");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    
  }
  
});

function openEditingForm(title, btn) {
  $titleCertificate.textContent = title;
  $btnCertificate.value = btn;

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
  }, 2500);

}




/*--------------------------------------------Load----------------------------------- */

function load() {
  getCertificateData();
  d.querySelector(".cont-new-certificate").classList.toggle(
    "open-form-certificate"
  );
  d.querySelector(".cont-tables-certificate").classList.toggle(
    "up-table-certificate"
  );
  news.classList.toggle("noticia");
}
/* -------------------------------------------------DELETE Method-------------------------------- */

const removeCertificate =(e)=>{
  if (e.target.matches(".remove-certificate")) {
    d.querySelector("#modal-container-dr").style.opacity = "1";
    d.querySelector("#modal-container-dr").style.visibility = "visible";
    d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.idr;
    d.addEventListener("submit", (e) => {
      if (e.target === $formDelete) {
        e.preventDefault();
        3;
  
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
              d.querySelector("#modal-container-dr").style.visibility ="hidden";
              
            }, 700);
            getCertificateData();
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



const vc = d.querySelector(".cont-table-certificate_blue"),
  vd = d.querySelector(".cont-tables-certificate");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});

const files = d.querySelectorAll("#fileCertificate");
Array.from(files).forEach((file) => {
  file.addEventListener("change", (e) => {
    const span = d.querySelector(".file-certificate-text");
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
  if (e.target.matches("#back-icon")) {
  
    d.querySelector(".cont-tables-certificate").classList.remove("up-table-certificate");
    d.querySelector(".cont-certificate2").classList.add("up-certificate2");
      e.target.style.display= "none"
      d.getElementById("table-icon").style.display = "inline";

  }

  if (e.target.matches("#table-icon")) {
    d.querySelector(".cont-tables-certificate").classList.add("up-table-certificate");
    d.querySelector(".cont-certificate2").classList.remove("up-certificate2");
    e.target.style.display = "none"
    d.getElementById("back-icon").style.display = "inline";

  }
});


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
  openCertificatesEditForm(e)
  removeCertificate(e);
  showSideBar(e);
});