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

/*--------------------------------------------show-----------------------*/

export function ModalShowStudent(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-student");
    }

    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-student");
    }
  });
}

/*-------------------------------------open form---------------------------------- */

export function openFormStudent(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      load();
      $formStudent.reset();
      editor.setContents(`Writte here...`);
      d.querySelector("#alert").style.display = "none";
    }
    if (e.target.matches(btnclose)) {
      load();
      $formStudent.reset();
    }
  });
}

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

let student = [];
export const studentp = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    if (!res.ok) {
      table.innerHTML = `<div class ="nada">no hay conexion </div>`;
    }
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-student");
      table.innerHTML = `<div class = "no-activities">NO STUDENTS YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A STUDENT</div`;
      }, 4000);
    } else {
      student = json;
      renderStudent(student);
    }
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

/*--------------------------------------------Render Resources-------------------------------- */
const renderStudent = (student) => {
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
    <td data-label = "Action">
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

/*-----------------------------------------------------Btn Read show------------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".read-student")) {
    d.querySelector("#modal-container-student").style.opacity = "1";
    d.querySelector("#modal-container-student").style.visibility = "visible";
    d.querySelector(".modal-student").classList.toggle("modal-clos");
    let id = e.target.dataset.ids,
      students = {};
    student.filter((el) => {
      if (el.id == id) {
        students = el;
      }
    });
    let code = ``;
    $modal.innerHTML = code;
  }

  if (e.target.matches(".poi")) {
    d.querySelector(".modal-student").classList.toggle("modal-clos");
    setTimeout(() => {
      d.querySelector("#modal-container-student").style.opacity = "0";
      d.querySelector("#modal-container-student").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }
});

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

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        studentp();
        load();
        $formStudent.reset();
        alertManager("success", "Created Successfully");
        d.querySelector(".text-membership").style.display = "inline";
        d.querySelector(".text-gender").style.display = "inline";
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
        /*  $formActivity.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}:${message}</p></b>`
          ); */
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
        /*  location.reload(); */
        $btnStudent.value = "Add new student";
        $titleStudent.textContent = "Create new student";
        load();
        alertManager("update", "Edit Successfully");
        $formStudent.reset();
        e.target.idi.value = "";
        d.querySelector(".text-membership").style.display = "inline";
        d.querySelector(".text-gender").style.display = "inline";
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
        /* $formActivity.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}:${message}</p></b>`
          ); */
      }
    }
  }
});

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

/*-----------------------------------------------------Btn Edit Up Modify----------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-student")) {
    $titleStudent.textContent = "Modify students";
    $btnStudent.value = "Save Changes";
    d.querySelector(".text-membership").style.display = "none";
    d.querySelector(".text-gender").style.display = "none";
    d.querySelector("#alert").style.display = "none";
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
});

/*--------------------------------------------Load----------------------------------- */

function load() {
  studentp();
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

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-student")) {
    d.querySelector("#modal-container-dr").style.opacity = "1";
    d.querySelector("#modal-container-dr").style.visibility = "visible";
    d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
    let id = e.target.dataset.idr;
 
   
    /*    deleteStudent(id); */
    d.addEventListener("submit", async (e) => {
      if (e.target === $formDelete) {

        e.preventDefault();
        let res = await fetch(`${API_URL}/${id}`,
         { method: "DELETE"})
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
          studentp();
          alertManager("deleted", "Deleted Successfully");
          $formDelete.reset();
      /*    d.querySelector(".remove-student").dataset.idr = ""; */
          setTimeout(() => {
            location.reload();
          }, 1900);
        });
      }

    /* let json = res.json();
        d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
        setTimeout(() => {
          d.querySelector("#modal-container-dr").style.opacity = "0";
          d.querySelector("#modal-container-dr").style.visibility = "hidden";
        }, 700);
        studentp();
        alertManager("deleted", "Deleted Successfully");
        $formDelete.reset();

        setTimeout(() => {
          location.reload();
        }, 1900); */







      /*  try {
      let options = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
      };
      (res = await fetch(
        `http://localhost:3000/course/${e.target.dataset.id}`,
        options
      )),
        (json = await res.json());
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      location.reload();
    } catch (error) {
      let message = err.statusText || "ocurrió un Error";
      $formCourse.insertAdjacentHTML(
        "afterend",
        `<p><b>Error ${err.status}:${message}</p></b>`
      );
    }
  
  */

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
});

d.addEventListener("click", (e)=>{
  if(e.target.matches(".btn-dr2")){
    $formDelete.reset();
    d.querySelector(".modal-dr").classList.toggle("modal-close-dr");
    d.querySelector(".remove-student").dataset.idr = null;
    /* setTimeout(() => {
      location.reload();
    }, 1200); */
    setTimeout(() => {
      d.querySelector("#modal-container-dr").style.opacity = "0";
      d.querySelector("#modal-container-dr").style.visibility = "hidden";
    }, 700);
  }
})


const vc = d.querySelector(".cont-table-student_blue"),
  vd = d.querySelector(".cont-tables-student");
window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});

const editor = SUNEDITOR.create(document.querySelector(".editor-student"), {
  value: "Comments...",

  buttonList: [
    ["font", "fontSize", "formatBlock"],
    ["paragraphStyle", "blockquote", "bold"],

    ["underline", "italic"],
    ["strike", "fontColor", "hiliteColor"],

    ["textStyle", "align", "horizontalRule"],

    ["list", "lineHeight", "fullScreen"],
  ],

  width: "100%",
  maxWidth: "1200px",
  lang: SUNEDITOR_LANG["en"],
});

editor.setDefaultStyle("font-family: Arial; font-size: 17px;");

const change = d.querySelector(".gender-student");
change.addEventListener("click", (e) => {});

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

d.addEventListener("click", (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
});
