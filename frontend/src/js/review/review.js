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


/*--------------------------------------------show-----------------------*/


/*-------------------------------------open form---------------------------------- */

export function openFormSponsor(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      load();
      $formReview.reset();
      editor.setContents(``);
      d.querySelector("#alert").style.display = "none";
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

let review = [];
export const getReviewData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-review");
      table.innerHTML = `<div class = "no-activities">NO REVIEW YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A REVIEW</div`;
      }, 4000);
    } else {
      review = json;
      renderSponsor(review);
      showInlist(review);
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-review");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};

/*--------------------------------------------Render Resources-------------------------------- */
const renderSponsor = (reviews) => {
  let codigo = "";
  reviews.reverse().forEach((ele, i) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "Reviews title">${ele.titleReview}</td>
    <td data-label = "Mention">${ele.mentionReview}</td>
    <td data-label = "Type">${ele.typeReview}</td>
    <td data-label = "Actions">
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
  });
  $tableReview.innerHTML = CodeTh();
  $tableReview.appendChild($fragment);
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */
const openWindowModal = (e)=>{
  if (e.target.matches(".read-review")) {
    d.querySelector("#modal-container-review").style.opacity = "1";
    d.querySelector("#modal-container-review").style.visibility = "visible";
    d.querySelector(".modal-review").classList.toggle("modal-clos");
    let id = e.target.dataset.ids,
      sponsors = {};
    review.filter((el) => {
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

}

const closeWindowModal = (e) =>{
  if (e.target.matches(".poi")) {
    d.querySelector(".modal-review").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-review").style.opacity = "0";
      d.querySelector("#modal-container-review").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }

}



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


/*---------------------------------------------------------------Method Post-------------------------------*/


d.addEventListener("submit", async (e) => {
  if (e.target === $formReview) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              titleReview: e.target.titleReview.value,
              mentionReview: e.target.mentionReview.value,
              typeReview: e.target.typeReview.value,
              authorReview: e.target.authorReview.value,
              editorReview: editor.getContents(),
            }),
          },
          res = await fetch(API_URL, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
          getReviewData();
          load();
          alertManager("success", "Created Successfully");
          $formReview.reset();
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
              titleReview: e.target.titleReview.value,
              mentionReview: e.target.mentionReview.value,
              typeReview: e.target.typeReview.value,
              authorReview: e.target.authorReview.value,
              editorReview: editor.getContents(),
            }),
          },
          res = await fetch(
            `${API_URL}/${e.target.idi.value}`,
            options
          ),
          json = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
            restartFormValues(e)
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
       
      }
    }
  }
});


/*---------------------------------------------------------------------------- */

function restartFormValues(e) {
  load();
  getReviewData();
  alertManager("update", "Edit Successfully");
  openEditingForm("Create new review", "Create review");
  $formNews.reset();
  e.target.idi.value = "";
  
}


/*------------------------------------------------ --------------------------------------------- */

function openEditingForm(title, btn) {
  $titleReview.textContent = title;
  $btnReview.value = btn;

}





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

const openReviewEditForm = (e)=>{
  if (e.target.matches(".edit-review")) {
    $titleReview.textContent = "Modify sponsors";
    $btnReview.value = "Save Changes";
    $btnReview.classList.toggle("edit-two");
    $btnReview.classList.toggle("btn-submit");
    let id = e.target.dataset.id,
      reviews = {};
    review.filter((el) => {
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

}




/*--------------------------------------------Load----------------------------------- */

function load() {
  getReviewData();
  d.querySelector(".cont-new-review").classList.toggle("open-form-review");
  d.querySelector(".cont-tables-review").classList.toggle("up-table-review");
  news.classList.toggle("noticia");
}
/* -------------------------------------------------DELETE Method-------------------------------- */

const removeReview = (e)=>{
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
            getReviewData();
            alertManager("deleted", "Deleted Successfully");
            $formDelete.reset();
            setTimeout(() => {
              location.reload();
            }, 1500);
          });
      }
    });
  }

}

/*--------------------------------------------------------------------------------------------------------------- */

const vc = d.querySelector(".cont-table-review_blue"),
  vd = d.querySelector(".cont-tables-review");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});



/* ---------------------------------------------- Editor -------------------------------------------------------- */


const editor = SUNEDITOR.create(document.querySelector(".txtarea-review"), {
  value: "Comments...",
  codeMirror: CodeMirror,
  katex: katex,
  buttonList: [
    // default
    ['undo', 'redo'],
    [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor', 'textStyle'],
    ['removeFormat'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
    ['-right', ':r-More Rich-default.more_plus', 'table', 'math', 'imageGallery'],
    ['-right', 'image', 'video', 'audio', 'link'],
    // (min-width: 992)
    ['%992', [
        ['undo', 'redo'],
        ['bold', 'underline', 'italic', 'strike'],
        [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
        ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'math', 'imageGallery']
    ]],
    // (min-width: 767)
    ['%767', [
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        [':e-More Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
        [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'math', 'imageGallery'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
    ]],
    // (min-width: 480)
    ['%480', [
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle'],
        [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
        [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
        [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'math', 'imageGallery'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
    ]]
],

  width: "100%",

  lang: SUNEDITOR_LANG["en"],
});


editor.setDefaultStyle("font-family: Arial; font-size: 13px;");

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

/*------------------------------------------------------------------------------------------------ */

const showSideBar = (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
};





d.addEventListener("click", (e) => {
  openWindowModal(e);
  closeWindowModal(e);
  openReviewEditForm(e);
  removeReview(e);
  showSideBar(e)
});