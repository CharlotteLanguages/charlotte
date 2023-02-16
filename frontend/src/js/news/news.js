const d = document,
  API_URL = `http://localhost:3000/news`,
  $formNews = d.querySelector(".crud-form-news"),
  $titleNews = d.querySelector(".crud-title-news"),
  $btnNews = d.getElementById("create-news"),
  $fragmentNews = d.createDocumentFragment(),
  $tableNews = d.querySelector(".crud-table-news"),
  $formDelete = d.querySelector(".form-delete"),
  $modal = document.querySelector(".cont-p-news");

export function ShowNews(btnOpen, btnClose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnOpen)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-news");
    }
    if (e.target.matches(btnClose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-news");
    }
  });
}

export function openFormNews(btnOpen, btnClose) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnOpen)) {
      editor.setContents(``);
      load();
    }
    if (e.target.matches(btnClose)) {
      load();
      $formNews.reset();
    }
  });
}

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>News</th>
    <th>Category</th>
    <th>Tags</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

/* -----------------------------------------------------Main Fetch----------------------------- */

export const getNewsData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json(),
      news = [];
    if (json.length <= 0) {
      const tables = d.querySelector(".crud-table-news");
      tables.innerHTML = `<div class = "no-activities">NO NEWS YET</div>`;
      setTimeout(() => {
        tables.innerHTML = `<div class = "no-activities add">ADD A NEW</div`;
      }, 4000);
      return;
    }
    news = json;
    passInformation(news);
    /*     if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

/* -------------------------------------------render courses------------------------------------------ */
function passInformation(news) {
  printNewsData(news);
  openWindowModal(news);
  loadDataForEditing(news);
}

const printNewsData = (news) => {
  news.forEach((ele) => {
    const $tr = d.createElement("tr"),
      codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.titleNews}</td>
    <td>${ele.categoryNews}</td>
    <td>${ele.tagsNews}</td>
    <td>
        <div class="icons-news">
        <i class="fas fa-dot-circle read-news" data-ids=${ele.id}></i>
        <i class="fas fa-pen edit-news" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-news" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragmentNews.appendChild($tr);
  });
  $tableNews.innerHTML = CodeTh();
  $tableNews.appendChild($fragmentNews);
};

/*---------------------------------------------------------------Method Post-------------------------------*/

function getDataFromForm() {
  return {
    id: $formNews.idi.value,
    titleNews: $formNews.titleNews.value,
    categoryNews: $formNews.categoryNews.value,
    tagsNews: $formNews.tagsNews.value,
    editorNews: editor.getContents(),
  };
}

export const addNews = () => {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".btn-submit")) {
      if (!$formNews.titleNews.value.length) {
        const value = $formNews.titleNews.value;
        $formNews.titleNews.value = "* Enter news name";
        setTimeout(() => {
          $formNews.$titleNews.value = value;
        }, 1500);
        return;
      }

      const newa = {
        titleNews: $formNews.titleNews.value,
        categoryNews: $formNews.categoryNews.value,
        tagsNews: $formNews.tagsNews.value,
        editorNews: editor.getContents(),
      };

      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newa),
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
          getNewsData();
          alertManager("success", "Created Successfully");
          $formNews.reset();
          editor.setContents(`hola mundo`);
        });
    }
  });
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */
const addStyles = () => {
  d.querySelector("#modal-container-news").style.opacity = "1";
  d.querySelector("#modal-container-news").style.visibility = "visible";
  d.querySelector(".modal-news").classList.toggle("modal-cl");
};

function openWindowModal(news) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".read-news")) {
      let id = e.target.dataset.ids,
        courses = {};
      addStyles();
      news.filter((el) => {
        if (el.id == id) courses = el;
      });

      courses.editorNews == "<p><br></p>"
        ? ($modal.innerHTML = `<div class = "no-description">Empty section</div>`)
        : ($modal.innerHTML = `<div>${courses.editorNews}</div>`);
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
  $titleNews.textContent = title;
  $btnNews.value = btn;
  $btnNews.classList.toggle("edit-two");
  $btnNews.classList.toggle("btn-submit");
}

function loadDataForEditing(news) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".edit-news")) {
      openEditingForm("Modify news", "Save Changes");
      let id = e.target.dataset.id,
        cours = {};
      news.filter((el) => {
        if (el.id == id) cours = el;
      });

      $formNews.idi.value = id;
      $formNews.titleNews.value = cours.titleNews;
      $formNews.categoryNews.value = cours.categoryNews;
      $formNews.tagsNews.value = cours.tagsNews;
      editor.setContents(`${cours.editorNews}`);
      load();
    }
  });
}

/*--------------------------------------------------------Put Method ---------------------------- */

export function editNews() {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".edit-two")) {
      fetch(`${API_URL}/${getDataFromForm().id}`, {
        method: "PUT",
        body: JSON.stringify(getDataFromForm()),
        headers: {
          "content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => {
          alertManager("error", error);
        })
        .then((response) => {
          load();
          getNewsData();
          alertManager("update", "Edit Successfully");
          openEditingForm("Create new news", "Add New news");
          $formNews.reset();
          setTimeout(() => {
            location.reload();
          }, 1500);
        });
    }
  });
}

/*----------------------------------------------Method Delete----------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-news")) {
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
            getNewsData();
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

function load() {
  d.querySelector(".cont-tables-news").classList.toggle("up-table-news");
  d.querySelector(".cont-new-news").classList.toggle("open-form-news");
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

const editor = SUNEDITOR.create(document.querySelector(".txtarea-news"), {
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
  lang: SUNEDITOR_LANG["en"],
});
editor.setDefaultStyle("font-family: Arial; font-size: 20px;");
const vc = d.querySelector(".cont-table-course_blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});
