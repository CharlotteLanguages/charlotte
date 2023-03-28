/*-----------------------------------------init const -----------------------------*/

const d = document,
  API_URL = `http://localhost:3000/resource`,
  $formResource = d.querySelector(".crud-form-resource"),
  $titleResource = d.querySelector(".crud-title-resource"),
  $tbnResource = d.getElementById("create-resource"),
  $tableResource = d.querySelector(".crud-table-resource"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-resource");
const news = d.querySelector("#container-noti");

export function ModalRemoveResources(btnshow, btnclose, modalContainer, modal) {
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

export function ModalShowResources(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    /*  if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("close-resource");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("close-resource");
    } */
  });
}

/*-------------------------------------open form---------------------------------- */

export function openFormResources(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
    }
    if (e.target.matches(btnclose)) {
      load();
      $formResource.reset();
    }
  });
}

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Resources</th>
    <th>Category</th>
    <th>Tags</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

let resource = [];
export const resourcep = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    /*  if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-resource");
      table.innerHTML = `<div class = "no-activities">NO RESOURCES YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A RESOURCE</div`;
      }, 4000);
    } else {
      resource = json;
      renderResources(resource);
    }
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

/*--------------------------------------------Render Resources-------------------------------- */
const renderResources = (resource) => {
  let codigo = "";
  resource.forEach((ele, i) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "Resources">${ele.resourceTitle}</td>
    <td data-label = "Category">${ele.category}</td>
    <td data-label = "Tags">${ele.tags}</td>
    <td data-label = "Actions">
        <div class="icons-resource">
        <i class="fas fa-dot-circle read-resource" data-ids = ${ele.id} ></i>
        <i class="fas fa-pen edit-resource" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-resource" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragment.appendChild($tr);
    if ((ele[i] = typeof Number)) console.log("es un numero", ele[i].category);
    console.log(resource[i].category);
  });
  $tableResource.innerHTML = CodeTh();
  $tableResource.appendChild($fragment);
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".read-resource")) {
    d.querySelector("#modal-container-resource").style.opacity = "1";
    d.querySelector("#modal-container-resource").style.visibility = "visible";
    d.querySelector(".modal-resource").classList.toggle("modal-clos");
    let id = e.target.dataset.ids,
      resources = {};
    resource.filter((resourc) => {
      if (resourc.id == id) {
        resources = resourc;
      }
    });
    console.log(resources.description);
    if (resources.description == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${resources.description}</div>`;
      $modal.innerHTML = codigo;
    }
  }
  if (e.target.matches(".poi")) {
    d.querySelector(".modal-resource").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-resource").style.opacity = "0";
      d.querySelector("#modal-container-resource").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }
});

/*--------------------------------------------------POST Method----------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-submit")) {
    if (
      !$formResource["resourceTitle"].value.length ||
      $formResource["category"].value == "Category"
    ) {
      $formResource["resourceTitle"].value = "*  Obligatory field";
      $formResource["category"].getElementsByTagName("option")[0].textContent =
        "*    Obligatory field";

      setTimeout(() => {
        $formResource["resourceTitle"].value = "";
        $formResource["category"].getElementsByTagName(
          "option"
        )[0].textContent = "Category";
      }, 1500);

      return;
    }
    const activity = {
      resourceTitle: $formResource["resourceTitle"].value,
      category: $formResource["category"].value,
      tags: $formResource["tags"].value,
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
        resourcep();
        load();
        $formResource.reset();
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
  if (e.target.matches(".edit-resource")) {
    $titleResource.textContent = "Modify Resources";
    $tbnResource.value = "Save Changes";
    $tbnResource.classList.toggle("edit-two");
    $tbnResource.classList.toggle("btn-submit");
    let id = e.target.dataset.id,
      resources = {};
    resource.filter((resourc) => {
      if (resourc.id == id) {
        resources = resourc;
      }
    });

    $formResource.idi.value = id;
    $formResource.resourceTitle.value = resources.resourceTitle;
    $formResource.category.value = resources.category;
    $formResource.tags.value = resources.tags;
    editor.setContents(`${resources.description}`);
    load();
  }
});

/*---------------------------------------------------PUT Method---------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    const activity = {
      id: $formResource.idi.value,
      resourceTitle: $formResource.resourceTitle.value,
      category: $formResource.category.value,
      tags: $formResource.tags.value,
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
        $tbnResource.value = "Add new resource";
        load();
        alertManager("update", "Edit Successfully");
        document.querySelector(".crud-form-resource").reset();
        $titleResource.textContent = "Create new resource";
        $tbnResource.classList.toggle("edit-two");
        $tbnResource.classList.toggle("btn-submit");
      });
  }
});

/*--------------------------------------------Load----------------------------------- */

function load() {
  resourcep();
  d.querySelector(".cont-new-resource").classList.toggle("open-form-resource");
  d.querySelector(".cont-tables-resource").classList.toggle(
    "up-table-resource"
  );
  news.classList.toggle("noticia");
}
/* -------------------------------------------------DELETE Method-------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-resource")) {
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
            resourcep();
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

function deleted(id) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".bnt-dr")) {
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
            d.querySelector("#modal-container-dr").style.visibility = "hidden";
          }, 700);
          resourcep();
          alertManager("deleted", "Deleted Successfully");
          $formDelete.reset();
        });
    }
  });
}

function remove(id) {
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
            d.querySelector("#modal-container-dr").style.visibility = "hidden";
          }, 700);
          resourcep();
          alertManager("deleted", "Deleted Successfully");
          $formDelete.reset();
        });
    }
  });
}

const editor = SUNEDITOR.create(document.querySelector(".txtarea-resource"), {
  buttonList: [
    ["undo", "redo", "font", "fontSize", "formatBlock"],
    ["paragraphStyle", "blockquote"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat", "outdent", "indent"],
    ["align", "horizontalRule", "list", "lineHeight"],
    ["link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.

    ["fullScreen", "showBlocks", "codeView", "table"],
    ["preview", "print"],
    ["save", "template"],
    ["codeView"],
    ["dir", "dir_ltr", "dir_rtl"],
  ],
  height: 450,

  lang: SUNEDITOR_LANG["en"],
});

const vc = d.querySelector(".cont-table-resource_blue"),
  vd = d.querySelector(".cont-tables-resource");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});
/*
sr.reveal(vd, {
sr.reveal($tableResource, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});
  duration: 1500,
  origin: "bottom",
  distance: "-50px",
}); */
d.addEventListener("click", (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
});
