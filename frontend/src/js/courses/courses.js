const d = document,
  API_URL = `http://localhost:3000/course`,
  $formCourse = d.querySelector(".crud-form-course"),
  $titleCourse = d.querySelector(".crud-title-course"),
  $tbnCourse = d.getElementById("create-course"),
  $fragmentCourse = d.createDocumentFragment(),
  $tableCourse = d.querySelector(".crud-table-course"),
  $formDelete = d.querySelector(".form-delete"),
  $modal = document.querySelector(".cont-p-course");


/*--------------------------------------------------------------------------------------------- */

export function openFormCourses(btnOpen, btnClose) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnOpen)) {
      editor.setContents(``);
      load();
      $formCourse.reset();
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
    if (e.target.matches(btnClose)) {
      load();
      $formCourse.reset();
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
  });
}


/*--------------------------------------------------------------------------------------------- */



function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Course title</th>
    <th>Category</th>
    <th>Price</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

/* -----------------------------------------------------Main Fetch----------------------------- */

let course = []
export const getCourseData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json()
    if (json.length <= 0) {
      const tables = d.querySelector(".crud-table-course");
      tables.innerHTML = `<div class = "no-activities">NO COURSES YET</div>`;
      setTimeout(() => {
        tables.innerHTML = `<div class = "no-activities add">ADD A COURSE</div`;
      }, 4000);
      return;
    }else{
      course = json;
      renderCoursesData(course);
    }
   
  } catch (err) {
    const table = d.querySelector(".crud-table-course");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};


/* -------------------------------------------render courses------------------------------------------ */



const renderCoursesData = (course) => {
  course.reverse().forEach((ele) => {
    const $tr = d.createElement("tr"),
      codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "Course title">${ele.courseTitle}</td>
    <td data-label = "Category">${ele.category}</td>
    <td data-label = "Price">${ele.price}</td>
    <td data-label = "Actions">
        <div class="icons-course">
        <i class="fas fa-dot-circle read-course" data-ids=${ele.id}></i>
        <i class="fas fa-pen edit-course" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-course" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragmentCourse.appendChild($tr);
  });
  $tableCourse.innerHTML = CodeTh();
  $tableCourse.appendChild($fragmentCourse);
};



/*-----------------------------------------------------Btn Read show------------------------------------------- */
const addStyles = () => {
  d.querySelector("#modal-container-course").style.opacity = "1";
  d.querySelector("#modal-container-course").style.visibility = "visible";
  d.querySelector(".modal-course").classList.toggle("modal-cl");
};



/*------------------------------------------------------------------------------------------------------- */
function openWindowModal(e) {
  if (e.target.matches(".read-course")) {
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      courses = {};
    addStyles();
    course.filter((el) => {
      if (el.id == id) courses = el;
    });

    courses.description == "<p><br></p>"
      ? ($modal.innerHTML = `<div class = "no-description">Empty section</div>`)
      : ($modal.innerHTML = `<div>${courses.description}</div>`);
  }

}


/*------------------------------------------------------------------------ */

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
  $titleCourse.textContent = title;
  $tbnCourse.value = btn;

}

function openCoursesEditForm(e) {
  if (e.target.matches(".edit-course")) {
    openEditingForm("Modify Courses", "Save Changes");
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.id,
      cours = {};
    course.filter((el) => {
      if (el.id == id) cours = el;
    });

    $formCourse.idi.value = id;
    $formCourse.courseTitle.value = cours.courseTitle;
    $formCourse.category.value = cours.category;
    $formCourse.price.value = cours.price;
    editor.setContents(`${cours.description}`);
    load();
  }

}


/*---------------------------------------------------------------Method Post-------------------------------*/




d.addEventListener("submit", async (e) => {
  if (e.target === $formCourse) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              courseTitle: e.target.courseTitle.value,
              category: e.target.category.value,
              price: e.target.price.value,
              description: editor.getContents(),
            }),
          },
          res = await fetch(API_URL, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
          getCourseData();
          load();
          alertManager("success", "Created Successfully");
          $formCourse.reset();
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
              courseTitle: e.target.courseTitle.value,
              category: e.target.category.value,
              price: e.target.price.value,
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




/*---------------------------------------------------------------------------------------------------------- */


function restartFormValues(e) {
  load();
  getCourseData();
  alertManager("update", "Edit Successfully");
  openEditingForm("Create new news", "Create course");
  $formCourse.reset();
  e.target.idi.value = "";
  d.querySelector(".tooltip").classList.remove("show_tooltip");
}



/*----------------------------------------------Method Delete----------------------------------------- */
const removeCourse = (e)=>{
  if (e.target.matches(".remove-course")) {
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
            getCourseData();
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



function load() {
  d.querySelector(".cont-tables-course").classList.toggle("up-table-course");
  d.querySelector(".cont-new-course").classList.toggle("open-form-course");
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


const editor = SUNEDITOR.create(document.querySelector(".txtarea-course"), {
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

/*-------------------------------------------------------------------------------------------------------------- */


const vc = d.querySelector(".cont-table-course_blue");
window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});


/*---------------------------------------------------------------------------------------------------------- */

const showSideBar = (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
};


/*-------------------------------------------------------------------------------------------------------------------- */
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
  openWindowModal(e);
  openCoursesEditForm(e);
  showSideBar(e);
  removeCourse(e);
});