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

export function ModalRemoveCertificate(
  btnshow,
  btnclose,
  modalContainer,
  modal
) {
  d.addEventListener("click", (e) => {
    /* if (e.target.matches(btnshow)) {
      console.log(e.target);
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-d");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-d");
    } */
  });
}

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
    }
    if (e.target.matches(btnclose)) {
      load();
      $formCertificate.reset();
      d.querySelector(".file-certificate-text").textContent =
        "Certificate template...";
    }
  });
}

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

let certificate = [];
export const getCertificateData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    /*  if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
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
    let message = err.statusText || "ocurrió un Error";
  }
};

/*--------------------------------------------Render Resources-------------------------------- */
const renderCertificate = (certificate) => {
  let codigo = "";
  certificate.forEach((ele, i) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody>
    <tr>
    <td>${ele.id}</td>
    <td>
    <div class = "cert-title" >${ele.certificateName}</div>
    <div class = "cert-text">${ele.certificateCategory}</div>
    </td>
    <td>
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

function search(certificate) {
  let codigo = "";
  certificate.forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `

    <tr>
    <td class ="fgh">${ele.id}</td>
    <td class ="fgh">${ele.certificateName}</td>
    <td class ="fgh">${ele.certificateCategory}</td>
    <td class ="fgh">${ele.certificateType}</td>
    <td class ="fgh">
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
    //REMOVER EL COLOR AZUL
    e.target.classList.remove(".style-btn-badges");
    //REMOVER LA TABLA SIGUIENTE
    d.querySelector(".cont-tables-certificate").classList.remove(
      "up-table-certificate"
    );
    // eliminar azul del contrario
    d.querySelector(".btn-search").classList.remove("style-badges2");
    //agregar table principal
    d.querySelector(".cont-certificate2").classList.add("up-certificate2");
  }
  if (e.target.matches(".btn-search")) {
    d.querySelector(".cont-tables-certificate").classList.add(
      "up-table-certificate"
    );

    //agregar color blanco a este
    e.target.classList.add("style-badges2");

    //remover
    d.querySelector(".cont-certificate2").classList.remove("up-certificate2");

    //agregar color azul al contrario
    d.querySelector(".btn-certificates-badges").classList.add(
      "style-btn-badges"
    );

    //quitar el blanco
    d.querySelector(".btn-certificates-badges").classList.remove(
      "style-badges2"
    );
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".read-certificate")) {
    d.querySelector("#modal-container-certificate").style.opacity = "1";
    d.querySelector("#modal-container-certificate").style.visibility =
      "visible";
    d.querySelector(".modal-certificate").classList.toggle("modal-clos");
    let id = e.target.dataset.ids,
      certificates = {};
    certificate.filter((el) => {
      if (el.id == id) {
        certificates = el;
      }
    });

    let code = `
  
      `;
    $modal.innerHTML = code;
  }
  if (e.target.matches(".poi")) {
    d.querySelector(".modal-certificate").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-certificate").style.opacity = "0";
      d.querySelector("#modal-container-certificate").style.visibility =
        "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }
});

/*--------------------------------------------------POST Method----------------------------------------- */

d.addEventListener("click", (e) => {
  /*   const email = d.querySelector(".email-referral"); */
  if (e.target.matches(".btn-submit")) {
    if (!$formCertificate.certificateName.value.length) {
      const val = $formCertificate.certificateName.value;
      $formCertificate.certificateName.value = "* Enter certificate name";
      setTimeout(() => {
        $formCertificate.certificateName.value = val;
      }, 1000);

      return;
    }
    const activity = {
      certificateName: $formCertificate.certificateName.value,
      certificateCategory: $formCertificate.certificateCategory.value,
      certificateType: $formCertificate.certificateType.value,
      certificateFile: $formCertificate.certificateFile.value,
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
        getCertificateData();
        load();
        $formCertificate.reset();
        alertManager("success", "Created Successfully");
        d.querySelector(".file-certificate-text").textContent =
          "Profile image...";
      });
  }
});

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

  /*  setTimeout(() => {
    location.reload();

  }, 2000); */
}

/*-----------------------------------------------------Btn Edit Up Modify----------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-certificate")) {
    $titleCertificate.textContent = "Modify certificates";
    $btnCertificate.value = "Save Changes";
    $btnCertificate.classList.toggle("edit-two");
    $btnCertificate.classList.toggle("btn-submit");
    let id = e.target.dataset.id,
      sponsors = {};
    certificate.filter((el) => {
      if (el.id == id) {
        sponsors = el;
      }
    });

    $formCertificate.idi.value = id;
    $formCertificate.certificateName.value = sponsors.certificateName;
    $formCertificate.certificateCategory.value = sponsors.certificateCategory;
    $formCertificate.certificateType.value = sponsors.certificateType;
    /*   $formCertificate.certificateFile.htmlInputElement =
      sponsors.certificateFile; */

    let file = d.querySelector(".file-certificate-text");
    if (sponsors.certificateFile !== "") {
      file.textContent = sponsors.certificateFile;
    } else {
      file.textContent = "No file selected";
    }

    load();
  }
});

/*---------------------------------------------------PUT Method---------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    const spon = {
      id: $formCertificate.idi.value,
      certificateName: $formCertificate.certificateName.value,
      certificateCategory: $formCertificate.certificateCategory.value,
      certificateType: $formCertificate.certificateType.value,
      certificateFile: $formCertificate.certificateFile.value,
    };

    if (!$formCertificate.certificateName.value.length) {
      const value = $formCertificate.certificateName.value;
      $formCertificate["sponsorName"].value = "* Enter certificate name";
      setTimeout(() => {
        $formCertificate.certificateName.value = value;
      }, 1000);

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
        $btnCertificate.value = "Add new certificate";
        load();
        alertManager("update", "Edit Successfully");
        document.querySelector(".crud-form-certificate").reset();
        $btnCertificate.classList.toggle("edit-two");
        $btnCertificate.classList.toggle("btn-submit");
        $titleCertificate.textContent = "Create certification / Badges";
      });
  }
});

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

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-certificate")) {
    d.querySelector("#modal-container-dr").style.opacity = "1";
    d.querySelector("#modal-container-dr").style.visibility = "visible";
    d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
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
              d.querySelector("#modal-container-dr").style.visibility =
                "hidden";
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
});

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
