const d = document,
  API_URL = `http://localhost:3000/classes`,
  $formClasses = d.querySelector(".crud-form-classes"),
  $titleClasses = d.querySelector(".crud-title-classes"),
  $btnClasses = d.getElementById("create-classes"),
  $tableClasses = d.querySelector(".crud-table-classes"),
  activity = d.querySelector(".table-classes"),
  $modal = document.querySelector(".cont-p-classes"),
  $formDelete = d.querySelector(".form-delete"),
  $fragmentClasses = d.createDocumentFragment();

export function ModalRemoveClasses(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      console.log(e.target);
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-d");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-d");
    }
  });
}

export function ModalShowClasses(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-classes");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-classes");
    }
  });
}

export function openFormClasses(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
      let currentDate = new Date(),
        currentDay = currentDate.getDate(),
        monthNumber = currentDate.getMonth() + 1,
        currentYear = currentDate.getFullYear();

      if (monthNumber < 10) {
        monthNumber = `0${monthNumber}`;
      }
      d.querySelector(".input-DateStart-classes").setAttribute(
        "min",
        `${currentYear}-${monthNumber}-${currentDay}`
      );
    }
    if (e.target.matches(btnclose)) {
      load();
      $formClasses.reset();
    }
  });
}
/* const activity = d.querySelector(".table-promotion"); */

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Class</th>
    <th>Student</th>
    <th>Date</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

let clase = [];
export const Classes = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    /*  if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-classes");
      table.innerHTML = `<div class = "no-activities">NO CLASSES YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A CLASS</div`;
      }, 4000);
    } else {
      clase = json;
      renderClasses(clase);
    }
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

const renderClasses = (clase) => {
  let codigo = "";
  clase.forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.classeTitle}</td>
    <td>${ele.classePrice}</td>
    <td>${ele.classeDateEnd}</td>
    <td>
        <div class="icons-classes">
        <i class="fas fa-dot-circle read-classes" data-ids = ${ele.id}></i>
        <i class="fas fa-pen edit-classes" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-classes" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragmentClasses.appendChild($tr);
  });
  $tableClasses.innerHTML = CodeTh();
  $tableClasses.appendChild($fragmentClasses);
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-submit")) {
    e.preventDefault();
    /* const formData = new FormData($formResource); */
    const activity = {
      classeTitle: $formClasses["classeTitle"].value,
      classePrice: $formClasses["classePrice"].value,
      classeOffer: $formClasses["classeOffer"].value,
      classeDateStart: $formClasses["classeDateStart"].value,
      classeDateEnd: $formClasses["classeDateEnd"].value,
      classeCategory: $formClasses["classeCategory"].value,
      classeDescription: editor.getContents(),
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
        Classes();

        document.querySelector(".crud-form-classes").reset();
        load();
        alertManager("success", "Created Successfully");
      });
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-classes")) {
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
            Classes();
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

function alertManager(typeMsg, message) {
  const alert = document.querySelector("#alert"),
    me = document.querySelector(".parrafo-succes");

  me.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 2000);
}

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-classes")) {
    $titleClasses.textContent = "Modify classes";
    $btnClasses.value = "Save Changes";
    $btnClasses.classList.toggle("edit-two");
    $btnClasses.classList.toggle("btn-submit");
    let id = e.target.dataset.id,
      promo = {};
    clase.filter((prom) => {
      if (prom.id == id) {
        promo = prom;
      }
    });

    $formClasses.idi.value = id;
    $formClasses.classeTitle.value = promo.classeTitle;
    $formClasses.classePrice.value = promo.classePrice;
    $formClasses.classeOffer.value = promo.classeOffer;
    $formClasses.classeDateStart.value = promo.classeDateStart;
    $formClasses.classeDateEnd.value = promo.classeDateEnd;
    $formClasses.classeCategory.value = promo.classeCategory;
    editor.setContents(`${promo.classeDescription}`);
    load();
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    const activity = {
      id: $formClasses.idi.value,
      classeTitle: $formClasses.classeTitle.value,
      classePrice: $formClasses.classePrice.value,
      classeOffer: $formClasses.classeOffer.value,
      classeDateStart: $formClasses.classeDateStart.value,
      classeDateEnd: $formClasses.classeDateEnd.value,
      classeCategory: $formClasses.classeCategory.value,
      classeDescription: editor.getContents(),
    };

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
        Classes();
        load();
        alertManager("update", "Edit Successfully");
        $btnClasses.classList.toggle("edit-two");
        $btnClasses.classList.toggle("btn-submit");
        $btnClasses.value = "Add New Offer";
        $titleClasses.textContent = "Create new class";
        $formClasses.reset();

        /*   document.querySelector(".crud-form-resource").reset(); */
      });
  }
});

/*-----------------------------------------------------Btn Read show------------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".read-classes")) {
    d.querySelector("#modal-container-classes").style.opacity = "1";
    d.querySelector("#modal-container-classes").style.visibility = "visible";
    d.querySelector(".modal-classes").classList.toggle("modal-clp");
    let id = e.target.dataset.ids,
      clase = {};
    clase.filter((prom) => {
      if (prom.id == id) {
        clase = prom;
      }
    });

    if (clase.classeDescription == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${clase.classeDescription}</div>`;
      $modal.innerHTML = codigo;
    }
  }
  if (e.target.matches(".poi")) {
    d.querySelector(".modal-classes").classList.toggle("modal-clp");
    setTimeout(() => {
      d.querySelector("#modal-container-classes").style.opacity = "0";
      d.querySelector("#modal-container-classes").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }
});

/* -------------------------------load -----------------------------*/

function load() {
  d.querySelector(".cont-tables-classes").classList.toggle("up-table-classes");
  d.querySelector(".cont-new-classes").classList.toggle("open-form-classes");
  d.querySelector("#container-noti").classList.toggle("noticia");
}

const editor = SUNEDITOR.create(document.querySelector(".txtarea-classes"), {
  buttonList: [
    ["undo", "redo"],
    ["font", "fontSize", "formatBlock"],
    ["paragraphStyle", "blockquote"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat"],
    "/", // Line break
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "lineHeight"],
    ["table", "link", "image", "video", "audio"], // You must add the 'katex' library at options to use the 'math' plugin.
    ["imageGallery"],
    ["fullScreen", "showBlocks", "codeView"],
    ["preview", "print"],
    ["save", "template"],
    ["codeView"],
    ["dir", "dir_ltr", "dir_rtl"],
  ],
  height: 380,

  lang: SUNEDITOR_LANG["en"],
});

const vc = d.querySelector(".cont-table-classes_blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});
let monthNames = [
  "Junary",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentDate = new Date(),
  currentDay = currentDate.getDate(),
  monthNumber = currentDate.getMonth(),
  currentYear = currentDate.getFullYear(),
  date = d.getElementById("dates"),
  year = d.getElementById("year"),
  month = d.getElementById("month"),
  preMonth = d.getElementById("prev-month"),
  nextMonth = d.getElementById("next-month");

export function calendar() {
  month.textContent = monthNames[monthNumber];
  year.textContent = currentYear.toString();

  preMonth.addEventListener("click", () => lastMonth());
  nextMonth.addEventListener("click", () => nextM());
  writeMonth(monthNumber);
}

function writeMonth(month) {
  for (let i = startDay(); i > 0; i--) {
    date.innerHTML += `<div class = "calendar__date calendar__item calendar__lastDays">${
      getTotalDays(monthNumber - 1) - (i - 1)
    }</div>`;
  }

  for (let i = 1; i <= getTotalDays(month); i++) {
    if (i === currentDay) {
      date.innerHTML += `<div class = "calendar__date calendar__item calendar__today">${i}</div>`;
    } else {
      date.innerHTML += `<div class = "calendar__date calendar__item">${i}</div>`;
    }
  }
}

function getTotalDays(month) {
  if (month == -1) month = 11;
  if (
    month == 0 ||
    month == 2 ||
    month == 4 ||
    month == 6 ||
    month == 7 ||
    month == 9 ||
    month == 11
  ) {
    return 31;
  } else if (month == 3 || month == 5 || month == 8 || month == 10) {
    return 30;
  } else {
    return isLeap() ? 29 : 28;
  }

  function isLeap() {
    return (
      (currentYear % 100 !== 0 && currentYear % 4 === 0) ||
      currentYear % 400 === 0
    );
  }
}

function startDay() {
  let start = new Date(currentYear, monthNumber, 1);
  return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
}

function lastMonth() {
  if (monthNumber !== 0) {
    monthNumber--;
  } else {
    monthNumber = 11;
    currentYear--;
  }
  setNewDate();
}

function nextM() {
  if (monthNumber !== 11) {
    monthNumber++;
  } else {
    monthNumber = 0;
    currentYear++;
  }
  setNewDate();
}

function setNewDate() {
  currentDate.setFullYear(currentYear, monthNumber, currentDay);
  month.textContent = monthNames[monthNumber];
  year.textContent = currentYear.toString();
  date.textContent = "";
  writeMonth(monthNumber);
}
d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-certificates-badges")) {
    /*     d.querySelector(".cont-new-classes").classList.remove("open-form-classes"); */
    //AGREGA EL COLOR BLANCO
    e.target.classList.add("style-badges2");
    //REMOVER EL COLOR AZUL
    e.target.classList.remove(".style-btn-badges");
    //REMOVER LA TABLA SIGUIENTE
    d.querySelector(".cont-tables-classes").classList.remove(
      "up-table-classes"
    );
    // eliminar azul del contrario
    d.querySelector(".btn-search").classList.remove("style-badges2");
    //agregar table principal
    d.querySelector(".calendar").classList.add("up-calendar");
  }
  if (e.target.matches(".btn-search")) {
    d.querySelector(".cont-tables-classes").classList.add("up-table-classes");

    //agregar color blanco a este
    e.target.classList.add("style-badges2");

    //remover
    d.querySelector(".calendar").classList.remove("up-calendar");

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
