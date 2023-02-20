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

export function ModalRemoveSponsor(btnshow, btnclose, modalContainer, modal) {
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

export function ModalShowSponsor(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-sponsor");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-sponsor");
    }
  });
}

/*-------------------------------------open form---------------------------------- */

export function openFormSponsor(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      load();
      $formSponsor.reset();
    }
    if (e.target.matches(btnclose)) {
      load();
      $formSponsor.reset();
      /* d.querySelector(".file-sponsor-text").textContent = "Profile image..."; */
    }
  });
}

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

let sponsor = [];
export const sponsorp = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    /*  if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
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
    let message = err.statusText || "ocurrió un Error";
  }
};

/*--------------------------------------------Render Resources-------------------------------- */
const renderSponsor = (sponsor) => {
  let codigo = "";
  sponsor.forEach((ele, i) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.sponsorName}</td>
    <td>${ele.sponsorAddress}</td>
    <td>${ele.sponsorWebsite}</td>
    <td>
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
    /* if ((ele[i] = typeof Number)) console.log("es un numero", ele[i].category);
    console.log(referral[i].category); */
  });
  $tableSponsor.innerHTML = CodeTh();
  $tableSponsor.appendChild($fragment);
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".read-sponsor")) {
    d.querySelector("#modal-container-sponsor").style.opacity = "1";
    d.querySelector("#modal-container-sponsor").style.visibility = "visible";
    d.querySelector(".modal-sponsor").classList.toggle("modal-clos");
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
      <div class = "truck"></div>
      `;
    $modal.innerHTML = code;
  }
  if (e.target.matches(".poi")) {
    d.querySelector(".modal-sponsor").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-sponsor").style.opacity = "0";
      d.querySelector("#modal-container-sponsor").style.visibility = "hidden";
    }, 700);
    d.querySelector(".modal-resource").classList.toggle("close-resource");
  }
});

/*--------------------------------------------------POST Method----------------------------------------- */

d.addEventListener("click", (e) => {
  /*   const email = d.querySelector(".email-referral"); */
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
        sponsorp();
        load();
        $formSponsor.reset();
        alertManager("success", "Created Successfully");
        d.querySelector(".file-sponsor-text").textContent = "Profile image...";
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
  if (e.target.matches(".edit-sponsor")) {
    $titleSponsor.textContent = "Modify sponsors";
    $btnSponsor.value = "Save Changes";
    $btnSponsor.classList.toggle("edit-two");
    $btnSponsor.classList.toggle("btn-submit");
    let id = e.target.dataset.id,
      sponsors = {};
    sponsor.filter((el) => {
      if (el.id == id) {
        sponsors = el;
      }
    });

    $formSponsor.idi.value = id;
    $formSponsor.sponsorName.value = sponsors.sponsorName;
    $formSponsor.sponsorAddress.value = sponsors.sponsorAddress;
    $formSponsor.sponsorWebsite.value = sponsors.sponsorWebsite;
   d.querySelector(".file-sponsor-text").textContent = sponsors.sponsorImage;
    load();
  }
});

/*---------------------------------------------------PUT Method---------------------------------- */

d.addEventListener("click", (e) => {
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

/*--------------------------------------------Load----------------------------------- */

function load() {
  sponsorp();
  d.querySelector(".cont-new-sponsor").classList.toggle("open-form-sponsor");
  d.querySelector(".cont-tables-sponsor").classList.toggle("up-table-sponsor");
  news.classList.toggle("noticia");
}
/* -------------------------------------------------DELETE Method-------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-sponsor")) {
    d.querySelector("#modal-container-dr").style.opacity = "1";
    d.querySelector("#modal-container-dr").style.visibility = "visible";
    d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
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
            sponsorp();
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
