const d = document;
const API_URL = `http://localhost:3000/activities`,
  $formActivity = d.querySelector(".crud-form"),
  $titleActivity = d.querySelector(".crud-title"),
  $tbnActivity = d.getElementById("create-review"),
  $tableActivity = d.querySelector(".crud-table"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete"),
  $modal = document.querySelector(".cont-p-activity");

/* const activity = d.querySelector(".table"); */

export function escrollBehavor(id1, id2, id3, id4) {
  window.sr = ScrollReveal();
  sr.reveal(id1, {
    duration: 7700,
    origin: "bottom",
    distance: "-5px",
  });
  sr.reveal(id2, {
    duration: 7500,
    origin: "bottom",
    distance: "-5px",
  });
  sr.reveal(id3, {
    duration: 7500,
    origin: "bottom",
    distance: "-5px",
  });
  sr.reveal(id4, {
    duration: 1000,
    origin: "bottom",
    distance: "-5px",
  });
}
export function ModalRemoveActivities(
  btnshow,
  btnclose,
  modalContainer,
  modal
) {
  d.addEventListener("click", async (e) => {
    /*  if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-d");
    } */
    if (e.target.matches(btnclose)) {
      /*  d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-d"); */
    }
  });
}

export function ModalShowActivities(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close");
    }
  });
}

export function openFormActivities(btnshow, btnclose, modal, table, noti) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
    }
    if (e.target.matches(btnclose)) {
      load();
      $formActivity.reset();
    }
  });
}

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Activity title</th>
    <th>Category</th>
    <th>Tags</th>
    <th>Actions</th>
    </tr>
    </thead> 
    `;
  return code;
}

let activity = [];
export const activitiesp = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    /*  if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table");
      table.innerHTML = `<div class = "no-activities">NO ACTIVITIES YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A ACTIVITY</div`;
      }, 4000);
    } else {
      activity = json;
      renderActivities(activity);
    }
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

const renderActivities = (activitie) => {
  let codigo = "";
  activitie.forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.activitiName}</td>
    <td>[${ele.category}] ${ele.level}</td>
    <td>${ele.tags}</td>
    <td>
        <div class="icons-activity">
        <i class="fas fa-dot-circle read-activity" data-ids = ${ele.id}></i>
        <i class="fas fa-pen edit-activity" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-activity" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragment.appendChild($tr);
  });
  $tableActivity.innerHTML = CodeTh();
  $tableActivity.appendChild($fragment);
};

function getDataFromForm() {
  return {
    id: $formActivity.idi.value,
    activitiName: $formActivity.activitiName,
    category: $formActivity.category,
    level: $formActivity.level,
    author: $formActivity.author,
    tags: $formActivity.tags,
    description: editor.getContents(),
  };
}

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-submit")) {
    const formData = new FormData($formActivity);
    const activity = {
      activitiName: formData.get("activitiName"),
      category: formData.get("category"),
      level: formData.get("level"),
      author: formData.get("author"),
      tags: formData.get("tags"),
      description: editor.getContents(),
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
        activitiesp();
        alertManager("success", "Created Successfully");
        $formActivity.reset();
        load();
      });
  }
});
d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-activity")) {
    e.preventDefault();
    $titleActivity.textContent = "Modify activity";
    $tbnActivity.value = "Save Changes";
    $tbnActivity.classList.toggle("edit-two");
    $tbnActivity.classList.toggle("btn-submit");

    let id = e.target.dataset.id,
      actividades = {};
    activity.filter((acti) => {
      if (acti.id == id) {
        actividades = acti;
      }
    });

    $formActivity.idi.value = id;
    $formActivity.activitiName.value = actividades.activitiName;
    $formActivity.category.value = actividades.category;
    $formActivity.level.value = actividades.level;
    $formActivity.author.value = actividades.author;
    $formActivity.tags.value = actividades.tags;
    editor.setContents(`${actividades.description}`);
    load();
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    e.preventDefault();
    const activity = {
      id: $formActivity.idi.value,
      activitiName: $formActivity.activitiName.value,
      category: $formActivity.category.value,
      level: $formActivity.level.value,
      author: $formActivity.author.value,
      tags: $formActivity.tags.value,
      description: editor.getContents(),
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
        activitiesp();
        load();
        $tbnActivity.classList.toggle("edit-two");
        $tbnActivity.classList.toggle("btn-submit");
        $tbnActivity.value = "Add new activity";
        $titleActivity.textContent = "Create new activity";
        alertManager("update", "Edit Successfully");
        $formActivity.reset();
      });
  }
});

/*-----------------------------------------------------Btn Read show------------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".read-activity")) {
    d.querySelector("#modal-container-activity").style.opacity = "1";
    d.querySelector("#modal-container-activity").style.visibility = "visible";
    d.querySelector(".modal-activity").classList.toggle("modal-cla");
    let id = e.target.dataset.ids,
      acti = {};
    activity.filter((el) => {
      if (el.id == id) {
        acti = el;
      }
    });
    console.log(acti.description);
    if (acti.description == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${acti.description}</div>`;
      $modal.innerHTML = codigo;
    }
  }
  if (e.target.matches(".poi")) {
    d.querySelector(".modal-activity").classList.toggle("modal-cla");
    setTimeout(() => {
      d.querySelector("#modal-container-activity").style.opacity = "0";
      d.querySelector("#modal-container-activity").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }
});

/*------------------------------------------------load-----------------------------*/
function load() {
  d.querySelector(".cont-new-review").classList.toggle("open-form-input");
  d.querySelector(".container__tables").classList.toggle("up-table");
  d.querySelector("#container-noti").classList.toggle("noticia");
}

const alertManager = (typeMsg, message) => {
  const alert = document.querySelector("#alert"),
    me = document.querySelector(".parrafo-succes");

  me.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 2000);
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-activity")) {
    d.querySelector("#modal-container-de").style.opacity = "1";
    d.querySelector("#modal-container-de").style.visibility = "visible";
    d.querySelector(".modal-de").classList.toggle("modal-close-de");
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
            d.querySelector(".modal-de").classList.toggle("modal-close-de");
            setTimeout(() => {
              d.querySelector("#modal-container-de").style.opacity = "0";
              d.querySelector("#modal-container-de").style.visibility =
                "hidden";
            }, 700);
            activitiesp();
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

const editor = SUNEDITOR.create(document.querySelector(".txtarea"), {
  codeMirror: CodeMirror,
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
    ["table", "link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
    ["imageGallery"],
    ["fullScreen", "showBlocks", "codeView"],
    ["preview", "print"],
    ["save", "template"],
    ["codeView"],
    ["dir", "dir_ltr", "dir_rtl"],
  ],
  height: 390,

  lang: SUNEDITOR_LANG["en"],
});

const vc = d.querySelector(".container__table--blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});

var inicio = new Date();

export function tiempo_carga() {
  var fin = new Date();
  var segundos = (fin - inicio) / 1000;
  var salida = "La pagina ha sido cargada en " + segundos + " segundos";
  document.getElementById("tiempoCarga").innerHTML = salida;
}
