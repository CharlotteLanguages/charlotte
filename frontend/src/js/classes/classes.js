const d = document,
  API_URL = `http://localhost:3000/classes`,
  $formClasses = d.querySelector(".crud-form-classes"),
  $titleClasses = d.querySelector(".crud-title-classes"),
  $btnClasses = d.getElementById("create-classes"),
  $tableClasses = d.querySelector(".crud-table-classes"),
  activity = d.querySelector(".table-classes"),
  $modal = document.querySelector(".cont-p-classes"),
  $formDelete = d.querySelector(".form-delete"),
  $fragmentClasses = d.createDocumentFragment();

/*------------------------------------------------------------------------------------------- */


export function openFormClasses(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
      $formClasses.reset();
      setCurrentDate();
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".btn-main-class").classList.toggle("btn-main-visible")
      d.querySelector(".btn-calendar-class").classList.toggle("btn-calendar-visible")
      d.getElementById("calendar-icon").style.display = "none";
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
    if (e.target.matches(btnclose)) {
      load();
      $formClasses.reset();
      d.querySelector(".btn-main-class").classList.remove("btn-main-visible")
      d.querySelector(".btn-calendar-class").classList.remove("btn-calendar-visible")
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    /*   d.getElementById("calendar-icon").style.display = "inline"; */
    }
  });
}

/*------------------------------------------------------------------------------------------------- */


function setCurrentDate(){
  let currentDate = new Date(),
        currentDay = currentDate.getDate(),
        monthNumber = currentDate.getMonth() + 1,
        currentYear = currentDate.getFullYear()
        /* año = currentDate.toLocaleString(),
        año1 = currentDate.toLocaleDateString(),
        año2 = currentDate.toLocaleTimeString(); */
      if (monthNumber < 10 || currentDay <10 )  monthNumber = `0${monthNumber}`;
     if(currentDay <10)  currentDay = `0${currentDay}`
      d.querySelector(".input-DateStart-classes").setAttribute("min",`${currentYear}-${monthNumber}-${currentDay}`);

}

/*------------------------------------------------------------------------------------------------------------- */


function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Class</th>
    <th>Student</th>
    <th>Date</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

/*-------------------------------------------------------------------------------------------------------------- */


let clase = [];
export const getClassesData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-classes");
      table.innerHTML = `<div class = "no-activities">NO CLASSES YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A CLASS</div`;
      }, 4000);
    } else {
      clase = json;
      renderClasses(clase);
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-classes");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};


/*---------------------------------------------------------------------------------------------------- */


const renderClasses = (clase) => {
  let codigo = "";
  clase.reverse().forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "Class">${ele.classTitle}</td>
    <td data-label = "Student">${ele.classStudentName}</td>
    <td data-label = "Date">${ele.classSetData.split("-").reverse().join("-")} ${ele.classSetTime}</td>
    <td data-label = "Actions">
        <div class="icons-classes">
        <i class="fas fa-dot-circle read-classes" data-ids = ${ele.id}></i>
        <i class="fas fa-pen edit-classes" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-classes" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragmentClasses.appendChild($tr);
  });
  $tableClasses.innerHTML = CodeTh();
  $tableClasses.appendChild($fragmentClasses);
};


/*------------------------------------------------------------------------------------------------------- */






const removeClasess = (e)=>{
  if (e.target.matches(".remove-classes")) {
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
            getClassesData();
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

/*-------------------------------------------------------------------------------------- */


const openClassesEditForm = (e)=>{
  if (e.target.matches(".edit-classes")) {
    $titleClasses.textContent = "Modify classes";
    $btnClasses.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".btn-main-class").classList.toggle("btn-main-visible")
    d.querySelector(".btn-calendar-class").classList.toggle("btn-calendar-visible")
    d.getElementById("calendar-icon").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");
   
    let id = e.target.dataset.id,
      clases = {};
    clase.filter((ele) => {
      if (ele.id == id) clases = ele;
      
    });
  
    $formClasses.idi.value = id;
    $formClasses.classTitle.value = clases.classTitle;
    $formClasses.classCategory.value = clases.classCategory;
    $formClasses.classStudentName.value = clases.classStudentName;
    $formClasses.classSetTime.value = clases.classSetTime;
    $formClasses.classSetData.value = clases.classSetData;
    $formClasses.classType.value = clases.classType;
    editor.setContents(`${clases.classeDescription}`);
    load();
  }

}



/*-----------------------------------------------------Btn Read show------------------------------------------- */
const openWindowModal = (e)=>{
  if (e.target.matches(".read-classes")) {
    d.querySelector("#modal-container-classes").style.opacity = "1";
    d.querySelector("#modal-container-classes").style.visibility = "visible";
    d.querySelector(".modal-classes").classList.toggle("modal-clp");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      clases = {};
    clase.filter((prom) => {
      if (prom.id == id) {
        clases = prom;
      }
    });
  
    if (clases.classeDescription == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${clases.classeDescription}</div>`;
      $modal.innerHTML = codigo;
    }
  }

}

const closeWindowModal = (e)=>{
  if (e.target.matches(".poi")) {
    d.querySelector(".modal-classes").classList.toggle("modal-clp");
    setTimeout(() => {
      d.querySelector("#modal-container-classes").style.opacity = "0";
      d.querySelector("#modal-container-classes").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }

}



/*---------------------------------------------------------------Method Post-------------------------------*/


d.addEventListener("submit", async (e) => {
  if (e.target === $formClasses) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              classTitle: e.target.classTitle.value,
              classCategory: e.target.classCategory.value,
              classStudentName: e.target.classStudentName.value,
              classSetTime: e.target.classSetTime.value,
              classSetData: e.target.classSetData.value,
              classType: e.target.classType.value,
              classeDescription: editor.getContents(),
            }),
          },
          res = await fetch(API_URL, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
          getClassesData();
          load();
          alertManager("success", "Created Successfully");
          $formClasses.reset();
          d.querySelector(".btn-main-class").classList.toggle("btn-main-visible")
          d.querySelector(".btn-calendar-class").classList.toggle("btn-calendar-visible")
          d.getElementById("calendar-icon").style.display = "inline";
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
              classTitle: e.target.classTitle.value,
              classCategory: e.target.classCategory.value,
              classStudentName: e.target.classStudentName.value,
              classSetTime: e.target.classSetTime.value,
              classSetData: e.target.classSetData.value,
              classType: e.target.classType.value,
              classeDescription: editor.getContents(),
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
  getClassesData();
  alertManager("update", "Edit Successfully");
  openEditingForm("Create new class", "Create class");
  $formClasses.reset();
  e.target.idi.value = "";
  d.querySelector(".btn-main-class").classList.toggle("btn-main-visible")
  d.querySelector(".btn-calendar-class").classList.toggle("btn-calendar-visible")
  d.getElementById("calendar-icon").style.display = "inline";
  d.querySelector(".tooltip").classList.remove("show_tooltip");
  
}

function openEditingForm(title, btn) {
  $titleClasses.textContent = title;
  $btnClasses.value = btn;

}






/* -------------------------------load -----------------------------*/

function load() {
  d.querySelector(".cont-tables-classes").classList.toggle("up-table-classes");
  d.querySelector(".cont-new-classes").classList.toggle("open-form-classes");
  d.querySelector("#container-noti").classList.toggle("noticia");
}



/* ---------------------------------------------- Editor -------------------------------------------------------- */


const editor = SUNEDITOR.create(document.querySelector(".txtarea-classes"), {
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




const vc = d.querySelector(".cont-table-classes_blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});
let monthNames = [
  "Junary",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDate = new Date(),
  currentDay = currentDate.getDate(),
  monthNumber = currentDate.getMonth(),
  currentYear = currentDate.getFullYear(),
  date = d.getElementById("dates"),
  year = d.getElementById("year"),
  month = d.getElementById("month"),
  preMonth = d.getElementById("prev-month"),
  nextMonth = d.getElementById("next-month");

export function calendar() {
  month.textContent = monthNames[monthNumber];
  year.textContent = currentYear.toString();

  preMonth.addEventListener("click", () => lastMonth());
  nextMonth.addEventListener("click", () => nextM());
  writeMonth(monthNumber);
}

function writeMonth(month) {
  for (let i = startDay(); i > 0; i--) {
    date.innerHTML += `<div class = "calendar__date calendar__item calendar__lastDays">${
      getTotalDays(monthNumber - 1) - (i - 1)
    }</div>`;
  }

  for (let i = 1; i <= getTotalDays(month); i++) {
    if (i === currentDay) {
      date.innerHTML += `<div class = "calendar__date calendar__item calendar__today">${i}</div>`;
    } else {
      date.innerHTML += `<div class = "calendar__date calendar__item">${i}</div>`;
    }
  }
}

function getTotalDays(month) {
  if (month == -1) month = 11;
  if (
    month == 0 ||
    month == 2 ||
    month == 4 ||
    month == 6 ||
    month == 7 ||
    month == 9 ||
    month == 11
  ) {
    return 31;
  } else if (month == 3 || month == 5 || month == 8 || month == 10) {
    return 30;
  } else {
    return isLeap() ? 29 : 28;
  }

  function isLeap() {
    return (
      (currentYear % 100 !== 0 && currentYear % 4 === 0) ||
      currentYear % 400 === 0
    );
  }
}

function startDay() {
  let start = new Date(currentYear, monthNumber, 1);
  return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
}

function lastMonth() {
  if (monthNumber !== 0) {
    monthNumber--;
  } else {
    monthNumber = 11;
    currentYear--;
  }
  setNewDate();
}

function nextM() {
  if (monthNumber !== 11) {
    monthNumber++;
  } else {
    monthNumber = 0;
    currentYear++;
  }
  setNewDate();
}

function setNewDate() {
  currentDate.setFullYear(currentYear, monthNumber, currentDay);
  month.textContent = monthNames[monthNumber];
  year.textContent = currentYear.toString();
  date.textContent = "";
  writeMonth(monthNumber);
}
d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-main-class")) {
    //agregar color blanco a este
    e.target.classList.add("add_color-white");
     //agrega color azul al contrario
     d.querySelector(".btn-calendar-class").classList.add("add_color-blue");
    //elimina color blanco al contrario
    d.querySelector(".btn-calendar-class").classList.remove("add_color-white");
    //REMOVER LA TABLA SIGUIENTE
    d.querySelector(".cont-tables-classes").classList.remove("up-table-certificate");
    //agregar table principal
    d.querySelector(".calendar").classList.add("up-calendar");
  }


  if (e.target.matches(".btn-calendar-class")) {
   
    //agregar color blanco a este
    e.target.classList.add("add_color-white");
    //agregar color azul al contrario
    d.querySelector(".btn-main-class").classList.add("add_color-blue");
   //quitar el blanco contrario
   d.querySelector(".btn-main-class").classList.remove("add_color-white");

    d.querySelector(".cont-tables-classes").classList.add("up-table-certificate" );
    //remover
    d.querySelector(".calendar").classList.remove("up-calendar");
  
  }
});



d.addEventListener("click", (e) => {
  if (e.target.matches("#back")) {
  
    d.querySelector(".cont-tables-classes").classList.remove("up-table-classes");
    d.querySelector(".calendar").classList.add("up-calendar");
      e.target.style.display= "none"
      d.getElementById("calendar-icon").style.display = "inline";

  }

  if (e.target.matches("#calendar-icon")) {
    d.querySelector(".cont-tables-classes").classList.add("up-table-classes");
    d.querySelector(".calendar").classList.remove("up-calendar");
    e.target.style.display = "none"
    d.getElementById("back").style.display = "inline";

  }
});




d.addEventListener("click", (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
});




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


d.addEventListener("click", (e) => {
  removeClasess(e);
  openWindowModal(e);
  closeWindowModal(e);
  openClassesEditForm(e);
});

