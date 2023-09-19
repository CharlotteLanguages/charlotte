

/*-----------------------------------------init const -----------------------------*/

const d = document,
  API_URL = `https://apicharlotte.up.railway.app/resource `,
  $formResource = d.querySelector(".crud-form-resource"),
  $titleResource = d.querySelector(".crud-title-resource"),
  $btnResource = d.getElementById("create-resource"),
  $tableResource = d.querySelector(".crud-table-resource"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-resource");
const news = d.querySelector("#container-noti");

/*-------------------------------------open form---------------------------------- */

 function openFormResources(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
      $formResource.reset();
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
    if (e.target.matches(btnclose)) {
      load();
      $formResource.reset();
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
  });
}

/*----------------------------------------------------------------------------------------- */

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

/*-------------------------------------------------------------------------------------- */

let resource = [];
 const getResourceData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-resource");
      table.innerHTML = `<div class = "no-activities">NO RESOURCES YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A RESOURCE</div`;
      }, 4000);
    } else {
      resource = json;
      renderResources(resource);
      addColorsTags();
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-resource");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
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
    <td data-label = "ID">${ele.idRecursos}</td>
    <td data-label = "Resources">${ele.recurso}</td>
    <td data-label = "Category">${ele.categoria}</td>
    <td data-label = "Tags" class = "tags">${ele.tags}</td>
    <td data-label = "Actions">
        <div class="icons-resource">
        <i class="fas fa-dot-circle read-resource" data-ids = ${ele.idRecursos} ></i>
        <i class="fas fa-pen edit-resource" data-id = ${ele.idRecursos}></i> 
        <i class="fas fa-times-circle remove-resource" data-idr =${ele.idRecursos}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragment.appendChild($tr);
  });
  $tableResource.innerHTML = CodeTh();
  $tableResource.appendChild($fragment);
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */

const opeModalEditor = (e) => {
  if (e.target.matches(".read-resource")) {
    d.querySelector("#modal-container-resource").style.opacity = "1";
    d.querySelector("#modal-container-resource").style.visibility = "visible";
    d.querySelector(".modal-resource").classList.toggle("modal-clos");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      resources = {};
    resource.filter((resourc) => {
      if (resourc.idRecursos == id) {
        resources = resourc;
      }
    });

    if (resources.description == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${resources.description}</div>`;
      $modal.innerHTML = codigo;
    }
  }
};

const closeModalEditor = (e) => {
  if (e.target.matches(".close")) {
    d.querySelector(".modal-resource").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-resource").style.opacity = "0";
      d.querySelector("#modal-container-resource").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }
};

/*-------------------------------------------------------------------------------------- */

function openEditingForm(title, btn) {
  $titleResource.textContent = title;
  $btnResource.value = btn;
}

/*--------------------------------------------------POST Method----------------------------------------- */

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

const openResourceEditForm = (e) => {
  if (e.target.matches(".edit-resource")) {
    $titleResource.textContent = "Modify Resources";
    $btnResource.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.id,
      resources = {};
    resource.filter((resourc) => {
      if (resourc.idRecursos == id) resources = resourc;
    });

    $formResource.idi.value = id;
    $formResource.resourceTitle.value = resources.recurso;
    $formResource.category.value = resources.categoria;
    $formResource.tags.value = resources.tags;
/*     editor.setContents(`${resources.description}`); */
    load();
  }
};

/*---------------------------------------------------------------Method Post-------------------------------*/

d.addEventListener("submit", async (e) => {
  if (e.target === $formResource) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              recurso: e.target.resourceTitle.value,
              categoria: e.target.category.value,
              tags: e.target.tags.value,
             /*  description: editor.getContents(), */
            }),
          },
          res = await fetch(API_URL, options),
          json = await res.json();

        getResourceData();
        load();
        alertManager("success", "Created Successfully");
        $formResource.reset();
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
              recurso: e.target.resourceTitle.value,
              categoria: e.target.category.value,
              tags: e.target.tags.value,
             /*  description: editor.getContents(), */
            }),
          },
          res = await fetch(`${API_URL}/${e.target.idi.value}`, options),
          json = await res.json();
       
        restartFormValues(e);
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
      }
    }
  }
});

function restartFormValues(e) {
  load();
  getResourceData();
  alertManager("update", "Edit Successfully");
  openEditingForm("Create new resource", "Create resource");
  $formResource.reset();
  e.target.idi.value = "";
  d.querySelector(".tooltip").classList.remove("show_tooltip");
}

/*--------------------------------------------Load----------------------------------- */

function load() {
  getResourceData();
  d.querySelector(".cont-new-resource").classList.toggle("open-form-resource");
  d.querySelector(".cont-tables-resource").classList.toggle(
    "up-table-resource"
  );
  news.classList.toggle("noticia");
}

/*--------------------------------------------------------------------- */

const openModalDelete = () => {
  d.querySelector(".modal-container-dr").style.opacity = "1";
  d.querySelector(".modal-container-dr").style.visibility = "visible";
  d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
  d.querySelector(".tooltip").classList.remove("show_tooltip");
};

/* -------------------------------------------------DELETE Method-------------------------------- */

const removeResource = (e) => {
  if (e.target.matches(".remove-resource")) {
    openModalDelete();
    let id = e.target.dataset.idr;
    d.addEventListener("submit", async (e) => {
      if (e.target === $formDelete) {
        e.preventDefault();
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              reasonDeleteResource: e.target.reasonDelete.value,
            }),
          },
          res = await fetch(
            "http://localhost:3000/reasonDeleteResources",
            options
          ),
          json = await res.json();
      }

      if (e.target === $formDelete) {
        e.preventDefault();

        try {
          let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" }),
            json = await res.json();
          $formDelete.reset();
          getResourceData();
          alertManager("deleted", "Deleted Successfully");
          d.querySelector(".modal-dr").classList.toggle("modal-close-dr");

          setTimeout(() => {
            d.querySelector(".modal-container-dr").style.opacity = "0";
            d.querySelector(".modal-container-dr").style.visibility = "hidden";
          }, 700);

          setTimeout(() => {
            location.reload();
          }, 1900);
        } catch (error) {}
      }
    });
  }
};

/*------------------------------------------------------------------------------------------------------- */

const editor = SUNEDITOR.create(document.querySelector(".txtarea-resource"), {
  value: "Comments...",
  codeMirror: CodeMirror,
  katex: katex,
  buttonList: [
    // default
    ["undo", "redo"],
    [
      ":p-More Paragraph-default.more_paragraph",
      "font",
      "fontSize",
      "formatBlock",
      "paragraphStyle",
      "blockquote",
    ],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "lineHeight"],
    [
      "-right",
      ":i-More Misc-default.more_vertical",
      "fullScreen",
      "showBlocks",
      "codeView",
      "preview",
      "print",
      "save",
      "template",
    ],
    [
      "-right",
      ":r-More Rich-default.more_plus",
      "table",
      "math",
      "imageGallery",
    ],
    ["-right", "image", "video", "audio", "link"],
    // (min-width: 992)
    [
      "%992",
      [
        ["undo", "redo"],
        ["bold", "underline", "italic", "strike"],
        [
          ":t-More Text-default.more_text",
          "subscript",
          "superscript",
          "fontColor",
          "hiliteColor",
          "textStyle",
        ],
        ["removeFormat"],
        ["outdent", "indent"],
        ["align", "horizontalRule", "list", "lineHeight"],
        [
          ":p-More Paragraph-default.more_paragraph",
          "font",
          "fontSize",
          "formatBlock",
          "paragraphStyle",
          "blockquote",
        ],
        [
          "-right",
          ":i-More Misc-default.more_vertical",
          "fullScreen",
          "showBlocks",
          "codeView",
          "preview",
          "print",
          "save",
          "template",
        ],
        [
          "-right",
          ":r-More Rich-default.more_plus",
          "table",
          "link",
          "image",
          "video",
          "audio",
          "math",
          "imageGallery",
        ],
      ],
    ],
    // (min-width: 767)
    [
      "%767",
      [
        ["undo", "redo"],
        [
          ":p-More Paragraph-default.more_paragraph",
          "font",
          "fontSize",
          "formatBlock",
          "paragraphStyle",
          "blockquote",
        ],
        [
          ":t-More Text-default.more_text",
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
        ["removeFormat"],
        ["outdent", "indent"],
        [
          ":e-More Line-default.more_horizontal",
          "align",
          "horizontalRule",
          "list",
          "lineHeight",
        ],
        [
          ":r-More Rich-default.more_plus",
          "table",
          "link",
          "image",
          "video",
          "audio",
          "math",
          "imageGallery",
        ],
        [
          "-right",
          ":i-More Misc-default.more_vertical",
          "fullScreen",
          "showBlocks",
          "codeView",
          "preview",
          "print",
          "save",
          "template",
        ],
      ],
    ],
    // (min-width: 480)
    [
      "%480",
      [
        [
          ":p-More Paragraph-default.more_paragraph",
          "font",
          "fontSize",
          "formatBlock",
          "paragraphStyle",
        ],
        [
          ":t-More Text-default.more_text",
          "bold",
          "underline",
          "italic",
          "strike",
          "subscript",
          "superscript",
          "fontColor",
          "hiliteColor",
          "textStyle",
          "removeFormat",
        ],
        [
          ":e-More Line-default.more_horizontal",
          "outdent",
          "indent",
          "align",
          "horizontalRule",
          "list",
          "lineHeight",
        ],
        [
          ":r-More Rich-default.more_plus",
          "table",
          "link",
          "image",
          "video",
          "audio",
          "math",
          "imageGallery",
        ],
        [
          "-right",
          ":i-More Misc-default.more_vertical",
          "fullScreen",
          "showBlocks",
          "codeView",
          "preview",
          "print",
          "save",
          "template",
        ],
      ],
    ],
  ],

  width: "100%",

  lang: SUNEDITOR_LANG["en"],
});

editor.setDefaultStyle("font-family: Arial; font-size: 13px;");

/*------------------------------------------------------------------------------------- */

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

/*------------------------------------------------------------------------------------- */

const showSideBar = (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
};

/*----------------------------------------------------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".fa-bell")) {
    d.querySelector(".tooltip").classList.toggle("show_tooltip");
  }
  if (e.target.matches(".nav__icon") || e.target.matches("#container")) {
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
  opeModalEditor(e);
  closeModalEditor(e);
  openResourceEditForm(e);
  showSideBar(e);
  removeResource(e);
});

function addColorsTags() {
  d.querySelectorAll(".tags").forEach((element) => {
    element.style.fontWeight = "600";

    if (element.textContent === "Speak") {
      element.style.color = "#fe2323";
    }

    if (element.textContent === "Listen") {
      element.style.color = "#33b3f3";
    }

    if (element.textContent === "Write") {
      element.style.color = "#00bd42";
    }
    if (element.textContent === "Read") {
      element.style.color = "#0052B4";
    }
  });
}



d.addEventListener("DOMContentLoaded", (e) => {
  getResourceData();
});
/* editor(); */
openFormResources(
  ".btn-resource",
  ".cancel-resource",
  ".cont-new-resource",
  ".cont-tables-resource"
);

