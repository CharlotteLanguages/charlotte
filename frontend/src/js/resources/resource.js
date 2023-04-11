/*-----------------------------------------init const -----------------------------*/

const d = document,
  API_URL = `http://localhost:3000/resource`,
  $formResource = d.querySelector(".crud-form-resource"),
  $titleResource = d.querySelector(".crud-title-resource"),
  $btnResource = d.getElementById("create-resource"),
  $tableResource = d.querySelector(".crud-table-resource"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-resource");
const news = d.querySelector("#container-noti");




/*-------------------------------------open form---------------------------------- */

export function openFormResources(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
      $formResource.reset();
      d.querySelector("#alert").style.display = "none";
    }
    if (e.target.matches(btnclose)) {
      load();
      $formResource.reset();
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
export const getResourceData = async () => {
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
  });
  $tableResource.innerHTML = CodeTh();
  $tableResource.appendChild($fragment);
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */

const opeModalEditor = (e)=>{
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

    if (resources.description == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${resources.description}</div>`;
      $modal.innerHTML = codigo;
    }
  }

}


const closeModalEditor = (e)=>{
  if (e.target.matches(".close")) {
    d.querySelector(".modal-resource").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-resource").style.opacity = "0";
      d.querySelector("#modal-container-resource").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }

}

/*-------------------------------------------------------------------------------------- */

function openEditingForm(title, btn) {
  $titleResource.textContent = title;
  $btnResource.value = btn;

}

/*--------------------------------------------------POST Method----------------------------------------- */

/* d.addEventListener("click", (e) => {
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
        getResourceData();
        load();
        $formResource.reset();
        alertManager("success", "Created Successfully");
      });
  }
}); */

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

 const openResourceEditForm = (e)=>{
   if (e.target.matches(".edit-resource")) {
     $titleResource.textContent = "Modify Resources";
     $btnResource.value = "Save Changes";
     d.querySelector("#alert").style.display = "none";
     let id = e.target.dataset.id,
       resources = {};
     resource.filter((resourc) => {
       if (resourc.id == id) resources = resourc;   
     });
  
     $formResource.idi.value = id;
     $formResource.resourceTitle.value = resources.resourceTitle;
     $formResource.category.value = resources.category;
     $formResource.tags.value = resources.tags;
     editor.setContents(`${resources.description}`);
     load();
   }
 }



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
              resourceTitle: e.target.resourceTitle.value,
              category: e.target.category.value,
              tags: e.target.tags.value,
              description: editor.getContents(),
            }),
          },
          res = await fetch(API_URL, options),
          json = await res.json();

          getResourceData();
          load();
          alertManager("success", "Created Successfully");
          $formResource.reset();
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
              resourceTitle: e.target.resourceTitle.value,
              category: e.target.category.value,
              tags: e.target.tags.value,
              description: editor.getContents(),
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


function restartFormValues(e) {
  load();
  getResourceData();
  alertManager("update", "Edit Successfully");
  openEditingForm("Create new resource", "Create resource");
  $formResource.reset();
  e.target.idi.value = "";
  
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
/* -------------------------------------------------DELETE Method-------------------------------- */


const removeResource = (e) =>{
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
            getResourceData();
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



/* function deleted(id) {
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
          getResourceData();
          alertManager("deleted", "Deleted Successfully");
          $formDelete.reset();
        });
    }
  });
}
 */
/* function remove(id) {
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
          getResourceData();
          alertManager("deleted", "Deleted Successfully");
          $formDelete.reset();
        });
    }
  });
}

 */

/*------------------------------------------------------------------------------------------------------- */

const editor = SUNEDITOR.create(document.querySelector(".txtarea-resource"), {
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
  opeModalEditor(e);
  closeModalEditor(e);
  openResourceEditForm(e);
  showSideBar(e);
  removeResource(e);
});
