const d = document,
 API_URL = `https://apicharlotte.up.railway.app/activities`,
 API_URL2 = `https://apicharlotte.up.railway.app/course`,
 wrapper = d.querySelector(".wrapper"),
 ApiReasonDelete = `http://localhost:3000/reasonDeleteActivities`,
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
export const getActivitiesData = async () => {
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
      addColors();

    }
  } catch (err) {
    const table = d.querySelector(".crud-table-activities");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};

/* export async function printCourses() {
  const API_URL = `https://apicharlotte.up.railway.app/course`;
  let input = d.querySelectorAll(".author-activity");

  let res = await fetch(API_URL),
    json = await res.json();
  json.sort().forEach((course) => {
    input.forEach((el) => {
      el.innerHTML += `<option>${course.titulo}</option>`;
    });

    try {
    } catch (error) {}
  });
} */

/*--------------------------------------------Render Resources-------------------------------- */

const renderActivities = (activitie) => {
  let codigo = "";
  activitie.reverse().forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td data-label = "ID">${ele.idActividades}</td>
    <td data-label = "Activity title">${ele.nombre}</td>
    <td data-label = "Category" class = "categoryActivities"> 
    <div class = "categ">[ ${ele.categoria} ]</div>
    <div class = "level">${ele.level}</div>
    </td>
    <td data-label = "Tags" class = "tags">${ele.tag}</td>
    <td data-label = "Actions">
        <div class="icons-activity">
        <i class="fas fa-dot-circle read-activity" data-ids = ${ele.idActividades}></i>
        <i class="fas fa-pen edit-activity" data-id = ${ele.idActividades}></i> 
        <i class="fas fa-times-circle remove-activity" data-idr =${ele.idActividades}></i>
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

const addStyles = () => {
  d.querySelector("#modal-container-activity").style.opacity = "1";
  d.querySelector("#modal-container-activity").style.visibility = "visible";
  d.querySelector(".modal-activity").classList.toggle("modal-cla");
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */

const openModalEditor = (e) => {
  if (e.target.matches(".read-activity")) {
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      acti = {};
    addStyles();
    activity.filter((el) => {
      if (el.idActividades == id) acti = el;
    });
    if (acti.detalles == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${acti.detalles}</div>`;
      $modal.innerHTML = codigo;
    }
  }
};

/*--------------------------------------------------------------------------------- */

const closeModalEditor = (e) => {
  if (e.target.matches(".close")) {
    d.querySelector(".modal-activity").classList.toggle("modal-cla");
    setTimeout(() => {
      d.querySelector("#modal-container-activity").style.opacity = "0";
      d.querySelector("#modal-container-activity").style.visibility = "hidden";
    }, 700);
  }
};

/*-----------------------------Btn Edit ---------------------------------- */

const openActivityEditForm = async (e) => {
  if (e.target.matches(".edit-activity")) {
    e.preventDefault();
    $titleActivity.textContent = "Modify activity";
    $btnActivity.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.id,
      actividades = {};
    activity.filter((acti) => {
      if (acti.idActividades == id) actividades = acti;
    });

    let response = await fetch("https://apicharlotte.up.railway.app/course"), 
    json = await response.json();

    json.map(ele=>{
      if(actividades.fk_curso == ele.idCurso){
        $formActivity.idi.value = id;
        $formActivity.activitiName.value = actividades.nombre;
        $formActivity.category.value = actividades.categoria;
        $formActivity.level.value = actividades.level;
        d.querySelector(".span").textContent = ele.titulo;
        /* $formActivity.course.value = ele.titulo; */
        $formActivity.tags.value = actividades.tag;
        editor.setContents(`${actividades.detalles}`);
        load();

      }

    })

  }
};

/*----------------------------------------------------------------------------------- */

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
function addColors() {
  d.querySelectorAll(".categ").forEach((element) => {
    element.style.fontWeight = "600";

    if (element.textContent.includes("[ Pro ]")) {
      element.style.color = "#33b3f3";
    }
    if (element.textContent.includes("[ Free ]")) {
      element.style.color = "#00bd42";
    }
    if (element.textContent.includes("[ Pro + ]")) {
      element.style.color = "#fe2323";
    }
    if (element.textContent.includes("[ Basic ]")) {
      element.style.color = "#0052B4";
    }
  });
}

/*-------------------------POST -------------------------------------- */

d.addEventListener("submit", async (e) => {
  if (e.target === $formActivity) {
    e.preventDefault();

    let response2 = await fetch("https://apicharlotte.up.railway.app/course"), 
    json1 = await response2.json(), options;

    if (!e.target.idi.value) {
      ///CREATE POST
      try {
       const pos = d.querySelector(".span").textContent.trim()
       json1.map(ele =>{

          /* let pos = wrapper.querySelectorAll("span").textContent
          console.log(wrapper.querySelectorAll("span")[0].innerText) */
       /*    let pos = "los mejores" */
  
          if(e.target.course.value.trim() == ele.titulo){     
            options = {
               method: "POST",
               headers: { "Content-type": "application/json" },
               body: JSON.stringify({
                 nombre: e.target.activitiName.value,
                 categoria: e.target.category.value,
                 level: e.target.level.value,
                 fk_curso: ele.idCurso,
                 tag: e.target.tags.value,
                 detalles: editor.getContents(),
               }),
             }
            
          }
        })
         let res = await fetch(API_URL, options),
          json = await res.json();

        load();
        getActivitiesData();
        $formActivity.reset();
        alertManager("success", "Created Successfully");
        d.querySelector(".tooltip").classList.remove("show_tooltip");

      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
      }
    } else {
      //UPDATE -PUT
      try {
        let options;
        json1.map(ele =>{
  
          if(e.target.course.value.trim() == ele.titulo){ 
           options = {
               method: "PUT",
               headers: { "Content-type": "application/json" },
               body: JSON.stringify({
                 nombre: e.target.activitiName.value,
                 categoria: e.target.category.value,
                 level: e.target.level.value,
                 fk_curso: ele.idCurso,
                 tag: e.target.tags.value,
                 detalles: editor.getContents(),
               })
             }
            
          }
        })

       
        let  res = await fetch(`${API_URL}/${e.target.idi.value}`, options),
          json = await res.json();
      
        $btnActivity.value = "Create activity";
        $titleActivity.textContent = "Create new activity";
        load();
        alertManager("update", "Edit Successfully");
        $formActivity.reset();
        getActivitiesData();
        e.target.idi.value = "";
        console.log("hola mundo")
        d.querySelector(".tooltip").classList.remove("show_tooltip");
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
      }
    }
  }
});

/*--------------------------------------------------------------------- */

const openModalDelete = () => {
  d.querySelector(".modal-container-dr").classList.add("modal-cancel-dr")
  d.querySelector(".modal-dr").classList.remove("modal-close-dr");
  d.querySelector(".tooltip").classList.remove("show_tooltip");
};

/*--------------------------------------- Btn delete---------------------------------------*/



const removeActivity = (e) => {
  if (e.target.matches(".remove-activity")) {
    let id = e.target.dataset.idr;
    openModalDelete();

    d.addEventListener("submit", async (e) => {
      if (e.target === $formDelete) {
        if (id !== 0) {
          e.preventDefault();

          try {
            let options = {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ reasonDeleteActivities: e.target.reasonDelete.value})},
              res = await fetch(ApiReasonDelete,options),
              json = await res.json();

          } catch (error) {console.log("reason not added")}


          try {
            let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" }),
              json = await res.json();

            $formDelete.reset();
            getActivitiesData();
            alertManager("deleted", "Deleted Successfully");
            d.querySelector(".modal-dr").classList.add("modal-close-dr");


            setTimeout(() => {
            d.querySelector(".modal-container-dr").classList.remove("modal-cancel-dr");
            }, 700);
            id = 0;

          } catch (error) {console.log("could not delete");}
        }
      }
    });

    d.addEventListener("click", (e) => {
      if (e.target.matches(".btn-dr2")) {
        $formDelete.reset();
        d.querySelector(".modal-dr").classList.add("modal-close-dr");

        setTimeout(() => {
          d.querySelector(".modal-container-dr").classList.remove("modal-cancel-dr");
        }, 700);
        id = 0;
      }
    });
  }
};

/*------------------------------------------------load-----------------------------*/

function load() {
  d.querySelector(".cont-new-activitie").classList.toggle(
    "open-form-activitie"
  );
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

/*----------------------------------------------------------------------------------------- */

d.addEventListener("click", (e) => {
  openModalEditor(e);
  closeModalEditor(e);
  openActivityEditForm(e);
  showSideBar(e);
  removeActivity(e);
});



let student = [];
 export const getStudentData = async () => {

  try {
    let res = await fetch(API_URL2),
      json = await res.json();
      student = json;
      console.log(student);
      /*  renderStudentData(student); */
       addStudent(student);

      
    } catch (err) {
        /*  const table = d.querySelector(".crud-table-student");
        table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`; */
    }
};





const selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");




function addStudent(selectedStudent){
  options.innerHTML = '';
  student.forEach(student =>{
    let isSelected = student == selectedStudent? 'selected': '';
    let li = `<li  class="${isSelected} lux">${student.idCurso}. ${student.titulo}</li>`;
    /* console.log(li) */
    options.insertAdjacentHTML("beforeend", li)
  })
  
  d.querySelectorAll(".lux").forEach((input) => {
    input.addEventListener("click", e=>{
      updateName(e.target)
      /* $formActivity.course.value = e.target.innerText.split(".")[1]
      console.log($formActivity.course.value) */
     let con = e.target.innerText.split(".")[1]
       d.querySelector(".span").textContent = con;
       $formActivity.course.value = con;

    
     /*  console.log(con)
      console.log(wrapper.querySelector("span").textContent) */
   /*   console.log(wrapper.querySelector("span").innerText.split(".")[1]) */
    });
    /* input.addEventListener("change", validateDateBirth); */
  });
}


function updateName(selectedLi){
  searchInp.value = "";
  addStudent(selectedLi.innerHTML);
  wrapper.classList.remove("active");
  selectBtn.firstElementChild.innerText = selectedLi.innerText;

}

searchInp.addEventListener("keyup", ()=>{
  let arr = [];
  let searchWord = searchInp.value.toLowerCase();
  arr = student.filter(data=>{
    return data.titulo.toLowerCase().startsWith(searchWord);
  }).map(data=>{
    let isSelected = data == selectBtn.firstElementChild.innerText? "selected": "";
    return `<li class="${isSelected} lux">${data.idCurso}. ${data.titulo}</li>`
  }).join("")
  options.innerHTML = arr ? arr: `<p style ="margin-top:10px">Oops! Student not found</p>`

  d.querySelectorAll(".lux").forEach((input) => {
    input.addEventListener("click", e=>{
      updateName(e.target)
      let con = e.target.innerText.split(".")[1]
      d.querySelector(".span").textContent = con
    });
    
  });
})

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));


