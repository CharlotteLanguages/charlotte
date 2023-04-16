const d = document;
const API_URL = `http://localhost:3000/activities`,
  $formActivity = d.querySelector(".crud-form"),
  $titleActivity = d.querySelector(".crud-title"),
  $btnActivity = d.getElementById("create-activitie"),
  $tableActivity = d.querySelector(".crud-table-activities"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-activity");


/*--------------------------------------------------------------------------------------------------------------------- */

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




/*-------------------------------------open form---------------------------------- */

export function openFormActivities(btnshow, btnclose, modal, table, noti) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".tooltip").classList.remove("show_tooltip");
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


/*---------------------------------------------------------------------------------------------- */



let activity = [];
export const activitiesp = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    /*  if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-activities");
      table.innerHTML = `<div class = "no-activities">NO ACTIVITIES YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A ACTIVITY</div`;
      }, 4000);
    } else {
      activity = json;
      renderActivities(activity);
      addColorsTags();
 
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-activities");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  
  }
};

/*--------------------------------------------Render Resources-------------------------------- */

const renderActivities = (activitie) => {
  let codigo = "";
  activitie.reverse().forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "Activity title">${ele.activitiName}</td>
    <td data-label = "Category" class = "category">[ ${ele.category} ] ${ele.level}</td>
    <td data-label = "Tags" class = "tags">${ele.tags}</td>
    <td data-label = "Actions">
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



/*----------------------------------------------------------------------------------------- */

const addStyles =()=>{
  d.querySelector("#modal-container-activity").style.opacity = "1";
  d.querySelector("#modal-container-activity").style.visibility = "visible";
  d.querySelector(".modal-activity").classList.toggle("modal-cla");
}



/*-----------------------------------------------------Btn Read show------------------------------------------- */

const openModalEditor = (e)=>{
  if (e.target.matches(".read-activity")) {
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      acti = {};
      addStyles();
    activity.filter((el) => {
      if (el.id == id)  acti = el;
      
    }); 
    if (acti.description == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${acti.description}</div>`;
      $modal.innerHTML = codigo;
    }
  }

}


/*--------------------------------------------------------------------------------- */

const closeModalEditor =(e)=>{
  if (e.target.matches(".close")) {
    d.querySelector(".modal-activity").classList.toggle("modal-cla");
    setTimeout(() => {
      d.querySelector("#modal-container-activity").style.opacity = "0";
      d.querySelector("#modal-container-activity").style.visibility = "hidden";
    }, 700);
  }

}


/*-----------------------------Btn Edit ---------------------------------- */

const openActivityEditForm = (e)=>{
  if (e.target.matches(".edit-activity")) {
    e.preventDefault();
    $titleActivity.textContent = "Modify activity";
    $btnActivity.value = "Save Changes";
     d.querySelector("#alert").style.display = "none";
     d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.id,
      actividades = {};
    activity.filter((acti) => {
      if (acti.id == id) actividades = acti;
      
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
}




/*----------------------------------------------------------------------------------- */


function addColorsTags(){
      d.querySelectorAll(".tags").forEach(element => {
        element.style.fontWeight = "600";

        if(element.textContent === "Speak"){
          element.style.color = "#fe2323";
        }

        if(element.textContent === "Listen"){
          element.style.color = "#33b3f3";
        }

        if(element.textContent === "Write"){
          element.style.color = "#00bd42";
        }
        if(element.textContent === "Read"){
          element.style.color = "#0052B4";
        }  
      });


}






/*-------------------------POST -------------------------------------- */

d.addEventListener("submit", async (e) => {
  if (e.target === $formActivity) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              activitiName: e.target.activitiName.value,
              category:  e.target.category.value,
              level: e.target.level.value,
              author: e.target.author.value,
              tags:  e.target.tags.value,
              description: editor.getContents(),
            }),
          },
          res = await fetch("http://localhost:3000/activities", options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        activitiesp();
        load();
        $formActivity.reset();
        alertManager("success", "Created Successfully");
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
              activitiName: e.target.activitiName.value,
              category:  e.target.category.value,
              level: e.target.level.value,
              author: e.target.author.value,
              tags:  e.target.tags.value,
              description: editor.getContents(),
            }),
          },
          res = await fetch(
            `http://localhost:3000/activities/${e.target.idi.value}`,
            options
          ),
          json = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        $btnActivity.value = "Create activity";
        $titleActivity.textContent = "Create new activity";
        load();
        alertManager("update", "Edit Successfully");
        $formActivity.reset();
        activitiesp();
        e.target.idi.value = "";
        d.querySelector(".tooltip").classList.remove("show_tooltip");
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
     
      }
    }
  }
});









/*--------------------------------------- Btn delete---------------------------------------*/

const removeActivity = (e)=>{
  if (e.target.matches(".remove-activity")) {
    d.querySelector("#modal-container-dr").style.opacity = "1";
    d.querySelector("#modal-container-dr").style.visibility = "visible";
    d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
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

}




/*------------------------------------------------load-----------------------------*/

function load() {
  d.querySelector(".cont-new-activitie").classList.toggle("open-form-activitie");
  d.querySelector(".cont-tables-activities").classList.toggle("up-table");
  d.querySelector("#container-noti").classList.toggle("noticia");
}


/*------------------------------------------------------------------------------------------------------ */


const alertManager = (typeMsg, message) => {
  const alert = document.querySelector("#alert"),
    me = document.querySelector(".parrafo-succes");

  me.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 2500);
};



/* ---------------------------------------------- Editor -------------------------------------------------------- */


const editor = SUNEDITOR.create(document.querySelector(".txtarea"), {
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


/*----------------------------------------------------------------------------------------------------------- */

const vc = d.querySelector(".cont-table-activities_blue");
window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});

/*------------------------------------------------------------------------------------- */

var inicio = new Date();
export function tiempo_carga() {
  var fin = new Date();
  var segundos = (fin - inicio) / 1000;
  var salida = "La pagina ha sido cargada en " + segundos + " segundos";
  document.getElementById("tiempoCarga").innerHTML = salida;
}

/*----------------------------------------------------------------------------------------------------------- */

const showSideBar = (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
};


d.addEventListener("click", (e) => {
  if (e.target.matches(".fa-bell") ){
    d.querySelector(".tooltip").classList.toggle("show_tooltip");
  }
  if (e.target.matches(".nav__icon") || e.target.matches("#container") ) {
    d.querySelector(".tooltip").classList.remove("show_tooltip");
  }

  if (e.target.matches(".notifications")) {
    d.querySelector(".tooltip_message").classList.toggle("show_notifications");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    d.querySelector(".open_tooltip").classList.add("fa-chevron-down");
    d.querySelector(".open_tooltip").classList.remove("fa-chevron-up");
  }
});


/*----------------------------------------------------------------------------------------- */

d.addEventListener("click", (e) => {
  openModalEditor(e);
  closeModalEditor(e);
  openActivityEditForm(e);
  showSideBar(e);
  removeActivity(e);
});