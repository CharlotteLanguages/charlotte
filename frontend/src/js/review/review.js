/*-----------------------------------------init const -----------------------------*/

const d = document,
  API_URL = `http://localhost:3000/reviews`,
  $formReview = d.querySelector(".crud-form-review"),
  $titleReview = d.querySelector(".crud-title-review"),
  $btnReview = d.getElementById("create-review"),
  $tableReview = d.querySelector(".crud-table-review"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-review");
const news = d.querySelector("#container-noti");

export function ModalRemoveReview(btnshow, btnclose, modalContainer, modal) {
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
      d.querySelector(modal).classList.toggle("modal-close-review");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-review");
    }
  });
}

/*-------------------------------------open form---------------------------------- */

export function openFormSponsor(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      load();
      $formReview.reset();
      editor.setContents(``);
    }
    if (e.target.matches(btnclose)) {
      load();
      $formReview.reset();
    }
  });
}

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Reviews Title</th>
    <th>Mentions</th>
    <th>Type</th>
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
      const table = d.querySelector(".crud-table-review");
      table.innerHTML = `<div class = "no-activities">NO REVIEW YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A REVIEW</div`;
      }, 4000);
    } else {
      sponsor = json;
      renderSponsor(sponsor);
      showInlist(sponsor);
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
    <td>${ele.titleReview}</td>
    <td>${ele.mentionReview}</td>
    <td>${ele.typeReview}</td>
    <td>
        <div class="icons-review">
        <i class="fas fa-dot-circle read-review" data-ids = ${ele.id} ></i>
        <i class="fas fa-pen edit-review" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-review" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragment.appendChild($tr);
    /* if ((ele[i] = typeof Number)) console.log("es un numero", ele[i].category);
    console.log(referral[i].category); */
  });
  $tableReview.innerHTML = CodeTh();
  $tableReview.appendChild($fragment);
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".read-review")) {
    d.querySelector("#modal-container-review").style.opacity = "1";
    d.querySelector("#modal-container-review").style.visibility = "visible";
    d.querySelector(".modal-review").classList.toggle("modal-clos");
    let id = e.target.dataset.ids,
      sponsors = {};
    sponsor.filter((el) => {
      if (el.id == id) {
        sponsors = el;
      }
    });
    if (sponsors.editorReview == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${sponsors.editorReview}</div>`;
      $modal.innerHTML = codigo;
    }
  }
  if (e.target.matches(".poi")) {
    d.querySelector(".modal-review").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-review").style.opacity = "0";
      d.querySelector("#modal-container-review").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }
});

const contComments = d.querySelector("#cont-comments");
function showInlist(msg) {
  let commets = "";
  msg.forEach((comment) => {
    commets += `
    <div class="comments">
    <p class="name">Alberto</p>
    <p class="type">Facebook</p>
    <p class="ago">3 hours ago..</p>
        <div class="comment">${comment.editorReview}</div>
        <button class="btn-share">share in Charlotte</button>
        <div class = "btn-del"><i class="fas fa-trash-alt"></i></div> 
        <p class= "textRemo">Remove</p>
        <div class = "userComment"><i class="fas fa-user-circle"></i></div>
        
        </div>
    `;
  });
  contComments.innerHTML = commets;
}

/*--------------------------------------------------POST Method----------------------------------------- */

d.addEventListener("click", (e) => {
  /*   const email = d.querySelector(".email-referral"); */
  if (e.target.matches(".btn-submit")) {
    /* if (
      !$formReview["sponsorName"].value.length ||
      !$formReview["sponsorWebsite"].value.length
    ) {
      const value = $formReview["sponsorName"].value;
      const web = $formReview["sponsorWebsite"].value;

      $formReview["sponsorName"].value = "* Enter review name";
      $formReview["sponsorWebsite"].value = "* Enter the review's Website";

      setTimeout(() => {
        $formReview["sponsorName"].value = value;
        $formReview["sponsorWebsite"].value = web;
      }, 1500);

      return;
    } */
    const review = {
      titleReview: $formReview["titleReview"].value,
      mentionReview: $formReview["mentionReview"].value,
      typeReview: $formReview["typeReview"].value,
      authorReview: $formReview["authorReview"].value,
      editorReview: editor.getContents(),
    };
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(review),
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
        $formReview.reset();
        alertManager("success", "Created Successfully");
        d.querySelector(".file-review-text").textContent = "Profile image...";
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
  if (e.target.matches(".edit-review")) {
    $titleReview.textContent = "Modify sponsors";
    $btnReview.value = "Save Changes";
    $btnReview.classList.toggle("edit-two");
    $btnReview.classList.toggle("btn-submit");
    let id = e.target.dataset.id,
      reviews = {};
    sponsor.filter((el) => {
      if (el.id == id) {
        reviews = el;
      }
    });

    $formReview.idi.value = id;
    $formReview.titleReview.value = reviews.titleReview;
    $formReview.mentionReview.value = reviews.mentionReview;
    $formReview.typeReview.value = reviews.typeReview;
    $formReview.authorReview.value = reviews.authorReview;
    editor.setContents(`${reviews.editorReview}`);
    load();
  }
});

/*---------------------------------------------------PUT Method---------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    const spon = {
      id: $formReview.idi.value,
      titleReview: $formReview["titleReview"].value,
      mentionReview: $formReview["mentionReview"].value,
      typeReview: $formReview["typeReview"].value,
      authorReview: $formReview["authorReview"].value,
      editorReview: editor.getContents(),
    };

    /*  if (
      !$formReview["sponsorName"].value.length ||
      !$formReview["sponsorWebsite"].value.length
    ) {
      const value = $formReview["sponsorName"].value;
      const web = $formReview["sponsorWebsite"].value;

      $formReview["sponsorName"].value = "* Enter review name";
      $formReview["sponsorWebsite"].value = "* Enter the Sponsor's Website";

      setTimeout(() => {
        $formReview["sponsorName"].value = value;
        $formReview["sponsorWebsite"].value = web;
      }, 1500);

      return;
    } */

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
        $btnReview.value = "Add new review";
        load();
        alertManager("update", "Edit Successfully");
        document.querySelector(".crud-form-review").reset();
        $btnReview.classList.toggle("edit-two");
        $btnReview.classList.toggle("btn-submit");
        $titleReview.textContent = "Create new review";
        $formReview.reset();
      });
  }
});

/*--------------------------------------------Load----------------------------------- */

function load() {
  sponsorp();
  d.querySelector(".cont-new-review").classList.toggle("open-form-review");
  d.querySelector(".cont-tables-review").classList.toggle("up-table-review");
  news.classList.toggle("noticia");
}
/* -------------------------------------------------DELETE Method-------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-review")) {
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

const vc = d.querySelector(".cont-table-review_blue"),
  vd = d.querySelector(".cont-tables-review");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});

const editor = SUNEDITOR.create(document.querySelector(".txtarea-review"), {
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
  height: 370,

  lang: SUNEDITOR_LANG["en"],
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-published")) {
    //AGREGA EL COLOR BLANCO
    /*  e.target.classList.add("style-badges2"); */
    //REMOVER EL COLOR AZUL
    /*  e.target.classList.remove(".style-btn-badges"); */
    //REMOVER LA TABLA SIGUIENTE
    d.querySelector(".cont-tables-review").classList.remove("up-table-review");
    // eliminar azul del contrario
    /*  d.querySelector(".comm").classList.remove("style-badges2"); */
    //agregar table principal
    d.querySelector(".comm").classList.add("up-comments");
    news.classList.remove("noticia");
  }
  if (e.target.matches(".btn-inList")) {
    d.querySelector(".cont-tables-review").classList.add("up-table-review");

    //agregar color blanco a este
    /*   e.target.classList.add("style-badges2"); */

    //remover
    d.querySelector(".comm").classList.remove("up-comments");
    news.classList.add("noticia");

    //agregar color azul al contrario
    /* d.querySelector(".cont-tables-review").classList.add("style-btn-badges"); */

    //quitar el blanco
    /*  d.querySelector(".cont-tables-review").classList.remove("style-badges2"); */
  }
});
