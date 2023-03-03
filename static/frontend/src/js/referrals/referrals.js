/*-----------------------------------------init const -----------------------------*/

const d = document,
  API_URL = `http://localhost:3000/referral`,
  $formReferral = d.querySelector(".crud-form-referral"),
  $titleReferral = d.querySelector(".crud-title-referral"),
  $tbnReferral = d.getElementById("create-referral"),
  $tableReferral = d.querySelector(".crud-table-referral"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-referral");
const news = d.querySelector("#container-noti");

export function ModalRemoveReferral(btnshow, btnclose, modalContainer, modal) {
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

export function ModalShowReferral(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-referral");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-referral");
    }
  });
}

/*-------------------------------------open form---------------------------------- */

export function openFormReferral(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      load();
    }
    if (e.target.matches(btnclose)) {
      load();
      $formReferral.reset();
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
export const referralp = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    /*  if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
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
    let message = err.statusText || "ocurrió un Error";
  }
};

/*--------------------------------------------Render Resources-------------------------------- */
const renderReferral = (referral) => {
  let codigo = "";
  referral.forEach((ele, i) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.referralName}</td>
    <td>${ele.referralEmail}</td>
    <td>${ele.referralPhone}</td>
    <td>
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
    /* if ((ele[i] = typeof Number)) console.log("es un numero", ele[i].category);
    console.log(referral[i].category); */
  });
  $tableReferral.innerHTML = CodeTh();
  $tableReferral.appendChild($fragment);
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".read-referral")) {
    d.querySelector("#modal-container-referral").style.opacity = "1";
    d.querySelector("#modal-container-referral").style.visibility = "visible";
    d.querySelector(".modal-referral").classList.toggle("modal-clos");
    let id = e.target.dataset.ids,
      referrals = {};
    referral.filter((el) => {
      if (el.id == id) {
        referrals = el;
      }
    });

    let code = `
      <div class = "refname">${referrals.referralName}</div>
      <div class = "refemail">${referrals.referralEmail}</div>
      <div = class = "refphone" >${referrals.referralPhone}</div>
      `;
    $modal.innerHTML = code;
  }
  if (e.target.matches(".poi")) {
    d.querySelector(".modal-referral").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-referral").style.opacity = "0";
      d.querySelector("#modal-container-referral").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }
});

/*--------------------------------------------------POST Method----------------------------------------- */

d.addEventListener("click", (e) => {
  const email = d.querySelector(".email-referral");
  if (e.target.matches(".btn-submit")) {
    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let validEmai = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (
      !validEmail.test($formReferral["referralEmail"].value) /* ||
      !$formReferral["referralName"].value.length ||
      !$formReferral["referralPhone"].value.length */
    ) {
      const value = $formReferral["referralEmail"].value;
      /*      const value2 = $formReferral["referralName"].value;
      const value3 = $formReferral["referralPhone"].value; */

      $formReferral["referralEmail"].value = "* Enter a valid email";
      /*  $formReferral["referralName"].value = "* campo requerido";
      $formReferral["referralPhone"].value = "* campo requerido"; */

      setTimeout(() => {
        $formReferral["referralEmail"].value = value;
        /*  $formReferral["referralName"].value = value2;
        $formReferral["referralPhone"].value = value3; */
      }, 1500);

      return;
    }
    const activity = {
      referralName: $formReferral["referralName"].value,
      referralEmail: $formReferral["referralEmail"].value,
      referralPhone: $formReferral["referralPhone"].value,
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
        referralp();
        load();
        $formReferral.reset();
        alertManager("success", "Created Successfully");
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
  if (e.target.matches(".edit-referral")) {
    $titleReferral.textContent = "Modify Referrals";
    $tbnReferral.value = "Save Changes";
    $tbnReferral.classList.toggle("edit-two");
    $tbnReferral.classList.toggle("btn-submit");
    let id = e.target.dataset.id,
      resources = {};
    referral.filter((resourc) => {
      if (resourc.id == id) {
        resources = resourc;
      }
    });

    $formReferral.idi.value = id;
    $formReferral.referralName.value = resources.referralName;
    $formReferral.referralEmail.value = resources.referralEmail;
    $formReferral.referralPhone.value = resources.referralPhone;

    load();
  }
});

/*---------------------------------------------------PUT Method---------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    const activity = {
      id: $formReferral.idi.value,
      referralName: $formReferral.referralName.value,
      referralEmail: $formReferral.referralEmail.value,
      referralPhone: $formReferral.referralPhone.value,
    };

    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let validEmai = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (
      !validEmai.test($formReferral["referralEmail"].value) /* ||
      !$formReferral["referralName"].value.length ||
      !$formReferral["referralPhone"].value.length */
    ) {
      const value = $formReferral["referralEmail"].value;
      /*      const value2 = $formReferral["referralName"].value;
      const value3 = $formReferral["referralPhone"].value; */

      $formReferral["referralEmail"].value = "* Enter a valid email";
      /*  $formReferral["referralName"].value = "* campo requerido";
      $formReferral["referralPhone"].value = "* campo requerido"; */

      setTimeout(() => {
        $formReferral["referralEmail"].value = value;
        /*  $formReferral["referralName"].value = value2;
        $formReferral["referralPhone"].value = value3; */
      }, 1500);

      return;
    }

    fetch(`${API_URL}/${activity.id}`, {
      method: "PUT",
      body: JSON.stringify(activity),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        alertManager("error", error);
      })
      .then((response) => {
        $tbnReferral.value = "Add new referal";
        load();
        alertManager("update", "Edit Successfully");
        document.querySelector(".crud-form-referral").reset();
        $tbnReferral.classList.toggle("edit-two");
        $tbnReferral.classList.toggle("btn-submit");
        $titleReferral.textContent = "Create new referral";
      });
  }
});

/*--------------------------------------------Load----------------------------------- */

function load() {
  referralp();
  d.querySelector(".cont-new-referral").classList.toggle("open-form-referral");
  d.querySelector(".cont-tables-referral").classList.toggle(
    "up-table-resource"
  );
  news.classList.toggle("noticia");
}
/* -------------------------------------------------DELETE Method-------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-referral")) {
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
            referralp();
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

const vc = d.querySelector(".cont-table-referral_blue"),
  vd = d.querySelector(".cont-tables-referral");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});
