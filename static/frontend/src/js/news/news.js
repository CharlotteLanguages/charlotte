const d = document,
  API_URL = `http://localhost:3000/news`,
  $formNews = d.querySelector(".crud-form-news"),
  $titleNews = d.querySelector(".crud-title-news"),
  $btnNews = d.getElementById("create-news"),
  $fragmentNews = d.createDocumentFragment(),
  $tableNews = d.querySelector(".crud-table-news"),
  $formDelete = d.querySelector(".form-delete"),
  $modal = document.querySelector(".cont-p-news");



/*------------------------------------------------------------------------------------------ */


export function openFormNews(btnOpen, btnClose) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnOpen)) {
      editor.setContents(``);
      $formNews.reset();
      load();
       d.querySelector("#alert").style.display = "none";
    }
    if (e.target.matches(btnClose)) {
      load();
      $formNews.reset();
    }
  });
}


/*------------------------------------------------------------------------------------------ */



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


let news = [];
export const getNewsData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json()
    if (json.length <= 0) {
      const tables = d.querySelector(".crud-table-news");
      tables.innerHTML = `<div class = "no-activities">NO NEWS YET</div>`;
      setTimeout(() => {
        tables.innerHTML = `<div class = "no-activities add">ADD A NEW</div`;
      }, 4000);
      return;
    }else{
      news = json;
      renderNewsData(news);
    }

  } catch (err) {
    const tables = d.querySelector(".crud-table-news");
    tables.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};


/*------------------------------------------------------------------------------------------ */


const renderNewsData = (news) => {
  news.reverse().forEach((ele) => {
    const $tr = d.createElement("tr"),
      codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "News">${ele.titleNews}</td>
    <td data-label = "Category">${ele.categoryNews}</td>
    <td data-label = "Tags">${ele.tagsNews}</td>
    <td data-label = "Actions">
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



/*-----------------------------------------------------Btn Read show------------------------------------------- */


const addStyles = () => {
  d.querySelector("#modal-container-news").style.opacity = "1";
  d.querySelector("#modal-container-news").style.visibility = "visible";
  d.querySelector(".modal-news").classList.toggle("modal-cl");
};


/*------------------------------------------------------------------------------------------ */


function openWindowModal(e) {
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
  
}


/*------------------------------------------------------------------------------------------ */


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

}

/*------------------------------------------------------------------------------------------ */

const openNewsEditForm  = (e)=>{
  if (e.target.matches(".edit-news")) {
    $titleNews.textContent = "Modify news";
    $btnNews.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    let id = e.target.dataset.id,
      Nnews = {};
    news.filter((el) => {
      if (el.id == id) Nnews = el;
    });

    $formNews.idi.value = id;
    $formNews.titleNews.value = Nnews.titleNews;
    $formNews.categoryNews.value = Nnews.categoryNews;
    $formNews.tagsNews.value = Nnews.tagsNews;
    editor.setContents(`${Nnews.editorNews}`);
    load();
  }
}






/*---------------------------------------------------------------Method Post-------------------------------*/


d.addEventListener("submit", async (e) => {
  if (e.target === $formNews) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              titleNews: e.target.titleNews.value,
              categoryNews: e.target.categoryNews.value,
              tagsNews: e.target.tagsNews.value,
              editorNews: editor.getContents(),
            }),
          },
          res = await fetch(API_URL, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
          getNewsData();
          load();
          alertManager("success", "Created Successfully");
          $formNews.reset();
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
              titleNews: e.target.titleNews.value,
              categoryNews: e.target.categoryNews.value,
              tagsNews: e.target.tagsNews.value,
              editorNews: editor.getContents(),
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
  getNewsData();
  alertManager("update", "Edit Successfully");
  openEditingForm("Create new news", "Create news");
  $formNews.reset();
  e.target.idi.value = "";
  
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


/*------------------------------------------------------------------------------------------ */

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
  }, 2500);
}

/* ---------------------------------------------- Editor -------------------------------------------------------- */


const editor = SUNEDITOR.create(document.querySelector(".txtarea-news"), {
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

/*------------------------------------------------------------------------------------------ */

const vc = d.querySelector(".cont-table-news_blue");
window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});



/*-------------------------------------------------------------------------- */

/* const closeModalDelete = (e) => {
  if (e.target.matches(".btn-dr2")) {
    $formDelete.reset();
    d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
    d.querySelector(".remove-student").dataset.idr = null;
    setTimeout(() => {
      d.querySelector("#modal-container-dr").style.opacity = "0";
      d.querySelector("#modal-container-dr").style.visibility = "hidden";
    }, 700);
  }
};
 */





/*------------------------------------------------------------------------------------------ */





const showSideBar = (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
};

d.addEventListener("click", (e) => {
  openNewsEditForm(e);
  openWindowModal(e);
  showSideBar(e);
/*   closeModalDelete(e) */
});
