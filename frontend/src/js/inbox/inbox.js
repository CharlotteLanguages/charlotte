const d = document,
  API_URL = `http://localhost:3000/inbox`,
  API_URL2 = `http://localhost:3000/student`,
  $formInbox = d.querySelector(".crud-form-inbox"),
  $titleInbox = d.querySelector(".crud-title-inbox"),
  $tbnInbox = d.getElementById("create-inbox"),
  $fragmentInbox = d.createDocumentFragment(),
  $fragmentInbox2 = d.createDocumentFragment(),
  $tableInbox = d.querySelector(".crud-table-inbox"),
  $formDelete = d.querySelector(".form-delete"),
  $modal = document.querySelector(".cont-p-inbox");

export function ShowInbox(btnOpen, btnClose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnOpen)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-inbox");
    }
    if (e.target.matches(btnClose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-inbox");
    }
  });
}

export function openFormInbox(btnOpen, btnClose) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnOpen)) {
      editor.setContents(`<p class = "fas fa-dot-circle"></p>`);
      load();
    }
    if (e.target.matches(btnClose)) {
      load();
      $formInbox.reset();
    }
  });
}

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Student</th>
    <th>Email</th>
    <th>Date</th>
    <th>Actions</th>
    </tr>
    </thead>`;
  return code;
}

/* -----------------------------------------------------Main Fetch----------------------------- */

export const getInboxData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json(),
      course = [];
    /*    if (json.length <= 0) {
      const tables = d.querySelector(".crud-table-inbox");
      tables.innerHTML = `<div class = "no-activities">NO MESSAGES YET</div>`;
      setTimeout(() => {
        tables.innerHTML = `<div class = "no-activities add">ADD A MESSAGE</div`;
      }, 4000);
      return;
    } */
    course = json;
    passInformation(course);
    /*     if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};
export const getInboxDataa = async () => {
  try {
    let res = await fetch(API_URL2),
      json = await res.json(),
      course = [];
    if (json.length <= 0) {
      const tables = d.querySelector(".crud-table-inbox");
      tables.innerHTML = `<div class = "no-activities">NO MESSAGES YET</div>`;
      setTimeout(() => {
        tables.innerHTML = `<div class = "no-activities add">ADD A MESSAGE</div`;
      }, 4000);
      return;
    }
    course = json;
    passInformation2(course);
    /*     if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

/* -------------------------------------------render courses------------------------------------------ */
function passInformation2(inbox) {
  printInboxData(inbox);
  showDeparture(inbox);
}
function passInformation(inbox) {
  openWindowModal(inbox);
  loadDataForEditing(inbox);
  llenar(inbox);
}

const Listudent = d.querySelector(".tables-inbox2");
function showDeparture(studets) {
  let ListStudents = "";
  const $div = d.createElement("div");
  studets.forEach((student) => {
    ListStudents += `
    <div class = "studenInbox">
    <p>${student.studentName} ${student.lastNameStudent}</p>
    <div class = "circleStudent"></div>
    </div>
    `;
    $div.innerHTML = ListStudents;
    $fragmentInbox2.appendChild($div);
  });
  Listudent.appendChild($fragmentInbox2);
  $div.classList.add("cont-studenInbox");
}
/* function showDeparture(studets) {
  let ListStudents = "";
  studets.forEach((student) => {
    ListStudents += `
    <div class = "cont-studenInbox">
    <div class = "studenInbox">${student.studentName} ${student.lastNameStudent}</div>
    </div>
    `;
  });
  Listudent.innerHTML = ListStudents;
}
 */
const printInboxData = (course) => {
  course.forEach((ele) => {
    const $tr = d.createElement("tr"),
      codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.studentName} ${ele.lastNameStudent}</td>
    <td>${ele.emailStudent}</td>
    <td>${ele.birthdayStudent}</td>
    <td>
        <div class="icons-inbox">
        <i class="fas fa-dot-circle read-inbox" data-ids=${ele.id}></i>
        <i class="fas fa-times-circle remove-inbox" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragmentInbox.appendChild($tr);
  });
  $tableInbox.innerHTML = CodeTh();
  $tableInbox.appendChild($fragmentInbox);
};

/*---------------------------------------------------------------Method Post-------------------------------*/

function getDataFromForm() {
  return {
    id: $formInbox.idi.value,
    student: $formInbox.student.value,
    subject: $formInbox.subject.value,
    type: $formInbox.type.value,
    description: editor.getContents(),
  };
}

export const addCourse = () => {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".btn-submit")) {
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(getDataFromForm()),
        headers: { "content-Type": "application/json" },
      })
        .then((res) => {
          res.json();
        })
        .catch((error) => {
          alertManager("error", error);
        })
        .then((res) => {
          load();
          getInboxData();
          alertManager("success", "Send Successfully");
          $formInbox.reset();
        });
    }
  });
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */
const addStyles = () => {
  d.querySelector("#modal-container-inbox").style.opacity = "1";
  d.querySelector("#modal-container-inbox").style.visibility = "visible";
  d.querySelector(".modal-inbox").classList.toggle("modal-cl");
};

function openWindowModal(inbox) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".read-inbox")) {
      let id = e.target.dataset.ids,
        courses = {};
      addStyles();
      inbox.filter((el) => {
        if (el.id == id) courses = el;
      });

      /*      $modal.innerHTML = `
        <div>${courses.student}</div>
        <div>${courses.subject}</div>
        <div>${courses.type}</div>
        `; */
    }
  });
}

export function closeWindowModal(btn, container, modal, toggle) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      d.querySelector(modal).classList.toggle(toggle);
      setTimeout(() => {
        d.querySelector(container).style.opacity = "0";
        d.querySelector(container).style.visibility = "hidden";
      }, 700);
    }
  });
}

/*-------------------------------------------Btn Edit --------------------------------------------- */

function openEditingForm(title, btn) {
  $titleInbox.textContent = title;
  $tbnInbox.value = btn;
  $tbnInbox.classList.toggle("edit-two");
  $tbnInbox.classList.toggle("btn-submit");
}

/*--------------------------------------------------------Put Method ---------------------------- */

/*----------------------------------------------Method Delete----------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-inbox")) {
    d.querySelector("#modal-container-dr").style.opacity = "1";
    d.querySelector("#modal-container-dr").style.visibility = "visible";
    d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
    let id = e.target.dataset.idr;
    d.addEventListener("submit", (e) => {
      if (e.target === $formDelete) {
        e.preventDefault();

        fetch(`${API_URL2}/${id}`, {
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
            getInboxData();
            alertManager("deleted", "Deleted Successfully");
            $formDelete.reset();
            $formInbox.reset();
            setTimeout(() => {
              location.reload();
            }, 1500);
          });
      }
    });
  }
});

function load() {
  d.querySelector(".cont-tables-inbox").classList.toggle("up-table-inbox");
  d.querySelector(".cont-new-inbox").classList.toggle("open-form-inbox");
  d.querySelector("#container-noti").classList.toggle("noticia");
}
/*---------------------------------------------- Alert Manager--------------------------------------- */

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

/* ---------------------------------------------- Editor -------------------------------------------------------- */

const editor = SUNEDITOR.create(document.querySelector(".txtarea-inbox"), {
  buttonList: [
    [
      "undo",
      "redo",
      "font",
      "fontSize",
      "formatBlock",
      "paragraphStyle",
      "blockquote",
    ],
    [
      "bold",
      "underline",
      "italic",
      "strike",
      "subscript",
      "superscript",
      "fontColor",
      "hiliteColor",
      "textStyle",
    ],
    [
      "removeFormat",
      "outdent",
      "indent",
      "align",
      "horizontalRule",
      "list",
      "lineHeight",
    ],
    ["link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
    ["fullScreen", "showBlocks", "codeView", "table"],
    ["preview", "print"],
    ["save", "template", "codeView"],
    ["dir", "dir_ltr", "dir_rtl"],
  ],
  height: 435,
  width: 1200,
  lang: SUNEDITOR_LANG["en"],
});
editor.setDefaultStyle("font-family: Arial; font-size: 20px;");
const vc = d.querySelector(".cont-table-inbox_blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-entry")) {
    /*btn-certificates-badges */

    //AGREGA EL COLOR BLANCO
    e.target.classList.add("style-badges2");
    //REMOVER EL COLOR AZUL
    e.target.classList.remove(".style-btn-badges");
    //REMOVER LA TABLA SIGUIENTE
    d.querySelector(".cont-tables-inbox").classList.remove("up-table-inbox");
    // eliminar azul del contrario
    d.querySelector(".btn-departure").classList.remove("style-badges2");
    //agregar table principal
    d.querySelector(".tables-inbox2").classList.add("up-table-inbox2");
    d.querySelector("#container-noti").classList.remove("noticia");
  }
  if (e.target.matches(".btn-departure")) {
    /*search */
    d.querySelector(".cont-tables-inbox").classList.add("up-table-inbox");

    //agregar color blanco a este
    e.target.classList.add("style-badges2");

    //remover
    d.querySelector(".tables-inbox2").classList.remove("up-table-inbox2");

    //agregar color azul al contrario
    d.querySelector(".btn-entry").classList.add("style-btn-badges");

    //quitar el blanco
    d.querySelector(".btn-entry").classList.remove("style-badges2");
    d.querySelector("#container-noti").classList.add("noticia");
  }
});
