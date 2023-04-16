/*-----------------------------------------daclare const -----------------------------*/

const d = document,
  API_URL = `http://localhost:3000/student`,
  $formStudent = d.querySelector(".crud-form-student"),
  $titleStudent = d.querySelector(".crud-title-student"),
  $btnStudent = d.getElementById("create-student"),
  $tableStudent = d.querySelector(".crud-table-student"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-student"),
  news = d.querySelector("#container-noti");




/*-------------------------------------open form---------------------------------- */

export function openFormStudent(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      load();
      $formStudent.reset();
      editor.setContents(``);
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".text-membership").style.display = "inline";
        d.querySelector(".text-gender").style.display = "inline";
        d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
    if (e.target.matches(btnclose)) {
      load();
      $formStudent.reset();
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
  });
}

d.addEventListener("click", e=>{
  if(e.target.matches(".text-membership")){
    d.querySelector(".membership-student").click()
  }
})

/*--------------------------------------------------------------------------------------------- */


function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Student</th>
    <th>Email</th>
    <th>Membership</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}


/*------------------------------------------------------------------------------------------ */

let student = [];
export const getStudentData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();

    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-student");
      table.innerHTML = `<div class = "no-activities">NO STUDENTS YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A STUDENT</div`;
      }, 4000);
    } else {
      student = json;
      renderStudentData(student);
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-student");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};

/*-------------------------------------------------------------------------------------------- */


const renderStudentData = (student) => {
  let codigo = "";
  student.reverse().forEach((ele, i) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "Student">${ele.studentName} ${ele.lastNameStudent}</td>
    <td data-label = "Email">${ele.emailStudent}</td>
    <td data-label = "Membership">${ele.membershipStudent}</td>
    <td data-label = "Actions">
        <div class="icons-student">
        <i class="fas fa-dot-circle read-student" data-ids = ${ele.id} ></i>
        <i class="fas fa-pen edit-student" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-student" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragment.appendChild($tr);
  });
  $tableStudent.innerHTML = CodeTh();
  $tableStudent.appendChild($fragment);
};




const addStyles = ()=>{
  d.querySelector("#modal-container-student").style.opacity = "1";
  d.querySelector("#modal-container-student").style.visibility = "visible";
  d.querySelector(".modal-student").classList.toggle("modal-clos");
}

/*------------------------------------------------------------------------------------------------ */


const openModalEditor = (e) => {
  if (e.target.matches(".read-student")) {
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      students = {};
      addStyles();
    student.filter((el) => {
      if (el.id == id) students = el;
      
    });
    let code = ``;
    $modal.innerHTML = code;
  }
};



/*----------------------------------------------------------------------------------------- */


const closeModalEditor = (e) => {
  if (e.target.matches(".close")) {
    d.querySelector(".modal-student").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-student").style.opacity = "0";
      d.querySelector("#modal-container-student").style.visibility = "hidden";
    }, 700);
  }
};


/*---------------------------------------------------------------------------------------------- */

const openStudentEditForm = (e) => {
  if (e.target.matches(".edit-student")) {
    $titleStudent.textContent = "Modify students";
    $btnStudent.value = "Save Changes";
    d.querySelector(".text-membership").style.display = "none";
    d.querySelector(".text-gender").style.display = "none";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.id,
      students = {};
    student.filter((el) => {
      if (el.id == id) {
        students = el;
      }
    });

    $formStudent.idi.value = id;
    $formStudent.studentName.value = students.studentName;
    $formStudent.lastNameStudent.value = students.lastNameStudent;
    $formStudent.emailStudent.value = students.emailStudent;
    $formStudent.birthdayStudent.value = students.birthdayStudent;
    $formStudent.genderStudent.value = students.genderStudent;
    $formStudent.usernameStudent.value = students.usernameStudent;
    $formStudent.passwordStudent.value = students.passwordStudent;
    $formStudent.membershipStudent.value = students.membershipStudent;
    editor.setContents(`${students.commentstudent}`);
    load();
  }
};



/*--------------------------------------------------POST and PUT Method----------------------------------------- */

d.addEventListener("submit", async (e) => {
  if (e.target === $formStudent) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              studentName: e.target.studentName.value,
              lastNameStudent: e.target.lastNameStudent.value,
              emailStudent: e.target.emailStudent.value,
              birthdayStudent: e.target.birthdayStudent.value,
              genderStudent: e.target.genderStudent.value,
              usernameStudent: e.target.usernameStudent.value,
              passwordStudent: e.target.passwordStudent.value,
              membershipStudent: e.target.membershipStudent.value,
              commentstudent: editor.getContents(),
            }),
          },
          res = await fetch("http://localhost:3000/student", options),
          json = await res.json();
        getStudentData();
        load();
        $formStudent.reset();
        alertManager("success", "Created Successfully");
        d.querySelector(".text-membership").style.display = "inline";
        d.querySelector(".text-gender").style.display = "inline";
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
              studentName: e.target.studentName.value,
              lastNameStudent: e.target.lastNameStudent.value,
              emailStudent: e.target.emailStudent.value,
              birthdayStudent: e.target.birthdayStudent.value,
              genderStudent: e.target.genderStudent.value,
              usernameStudent: e.target.usernameStudent.value,
              passwordStudent: e.target.passwordStudent.value,
              membershipStudent: e.target.membershipStudent.value,
              commentstudent: editor.getContents(),
            }),
          },
          res = await fetch(
            `http://localhost:3000/student/${e.target.idi.value}`,
            options
          ),
          json = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        restartFormValues(e);
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
      }
    }
  }
});

/*----------------------------------------------------------------------------------- */


function restartFormValues(e) {
  $btnStudent.value = "Create student";
  $titleStudent.textContent = "Create new student";
  load();
  alertManager("update", "Edit Successfully");
  $formStudent.reset();
  e.target.idi.value = "";
  d.querySelector(".text-membership").style.display = "inline";
  d.querySelector(".text-gender").style.display = "inline";
  d.querySelector(".tooltip").classList.remove("show_tooltip");
}



/*---------------------------------------------------AlertManager------------------------------------------ */

function alertManager(typeMsg, message) {
  const alert = document.querySelector("#alert"),
    mensaje = document.querySelector(".parrafo-succes");
  mensaje.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";
  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 2500);
}



/*------------------------------------------------------------------------------- */

function load() {
  getStudentData();
  d.querySelector(".cont-new-student").classList.toggle("open-form-student");
  d.querySelector(".cont-tables-student").classList.toggle("up-table-student");
  news.classList.toggle("noticia");
}

/* -------------------------------------------------DELETE Method-------------------------------- */

d.addEventListener("change", (e) => {
  if (e.target.matches(".membership-student")) {
    d.querySelector(".text-membership").style.display = "none";
  }
  if (e.target.matches(".gender-student")) {
    d.querySelector(".text-gender").style.display = "none";
  }
});


/*--------------------------------------------------------------------- */


const openModalDelete =()=>{
  d.querySelector("#modal-container-dr").style.opacity = "1";
    d.querySelector("#modal-container-dr").style.visibility = "visible";
    d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
}


/*------------------------------------------------------------------ */

const removeStudent = (e) => {
  if (e.target.matches(".remove-student")) {
    openModalDelete()
    let id = e.target.dataset.idr;
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    d.addEventListener("submit", async (e) => {
      if (e.target === $formDelete) {
        e.preventDefault();
        let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
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
            getStudentData();
            alertManager("deleted", "Deleted Successfully");
            $formDelete.reset();
            setTimeout(() => {
              location.reload();
            }, 1900);
          });
      }

      if (e.target === $formDelete) {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              reasonDeleteStudent: e.target.reasonDelete.value,
            }),
          },
          res = await fetch(
            "http://localhost:3000/reasonDeleteStudent",
            options
          ),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        /* d.querySelector(".remove-student").dataset.idr = ""; */
      }
    });
  }
};


/*-------------------------------------------------------------------------- */

const closeModalDelete = (e) => {
  if (e.target.matches(".btn-dr2")) {
    $formDelete.reset();
    d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
    d.querySelector(".remove-student").dataset.idr = null;
    setTimeout(() => {
      d.querySelector("#modal-container-dr").style.opacity = "0";
      d.querySelector("#modal-container-dr").style.visibility = "hidden";
    }, 700);
    setTimeout(() => {
      location.reload();
    }, 710);
  }
};

/*------------------------------------------------------------------------------------- */

const showSideBar = (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
};



/*------------------------------------------------------------------------*/

const vc = d.querySelector(".cont-table-student_blue"),
  vd = d.querySelector(".cont-tables-student");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});


/*------------------------------------------------------------------------------------- */

const editor = SUNEDITOR.create(document.querySelector(".editor-student"), {
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

/*-------------------------------------------------------------------------------- */

/* const ctx = d.querySelector("#myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
});
 */





/*------------------------------------------------------------------------------------- */

window.addEventListener("load", ()=>{
  document.getElementById("loader").classList.toggle("loader2");

})


d.addEventListener("click", (e) => {
  openStudentEditForm(e);
  closeModalDelete(e);
  showSideBar(e);
  openModalEditor(e);
  closeModalEditor(e);
  removeStudent(e);
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