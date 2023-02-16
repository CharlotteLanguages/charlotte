/*-----------------------------------------init const -----------------------------*/

const d = document,
  API_URL = `http://localhost:3000/student`,
  $formStudent = d.querySelector(".crud-form-student"),
  $titleStudent = d.querySelector(".crud-title-student"),
  $btnStudent = d.getElementById("create-student"),
  $tableStudent = d.querySelector(".crud-table-student"),
  $fragment = d.createDocumentFragment(),
  $formDelete = d.querySelector(".form-delete-dr"),
  $modal = document.querySelector(".cont-p-student");
const news = d.querySelector("#container-noti");

export function ModalRemoveStudent(btnshow, btnclose, modalContainer, modal) {
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
    /*  if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-student");
      table.innerHTML = `<div class = "no-activities">NO STUDENTS YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A STUDENT</div`;
      }, 4000);
    } else {
      student = json;
      renderSponsor(student);
    }
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

/*--------------------------------------------Render Resources-------------------------------- */
const renderSponsor = (student) => {
  let codigo = "";
  student.forEach((ele, i) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.studentName} ${ele.lastNameStudent}</td>
    <td>${ele.emailStudent}</td>
    <td>${ele.membershipStudent}</td>
    <td>
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
    /* if ((ele[i] = typeof Number)) console.log("es un numero", ele[i].category);
    console.log(referral[i].category); */
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

    let code = `
      <div class ="card-info-students">
      <div>${students.studentName} ${students.lastNameStudent}</div> 
      <div>${students.emailStudent}</div> 
      <div>${students.genderStudent}</div> 
      <div>${students.birthdayStudent}</div> 
      <div>${students.usernameStudent}</div> 
      <div>${students.membershipStudent}</div> 
      </div>
      
       <div class="hello">Completed Courses</div> 
       <div class="hello2">Completed Courses</div> 
       <div class="hola">exercice introduccion</div> 
       <div class="hola1">exercice introduccion</div> 
       <div class="hola2">exercice introduccion</div> 
       <div class="dowload1">Dowload Report</div> 
       <div class="dowload2">Dowload Report</div> 
       <i class="fas fa-check-circle succes-student"></i>
       <i class="fas fa-check-circle succes-student2"></i>
       <i class="fas fa-check-circle succes-student23"></i>

      `;
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

/*--------------------------------------------------POST Method----------------------------------------- */

d.addEventListener("click", (e) => {
  /*   const email = d.querySelector(".email-referral"); */
  if (e.target.matches(".btn-submit")) {

    let regexp_password =
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    /* !validEmai.test($formReferral["referralEmail"].value) */
    if (
      regexp_password.test($formStudent["studentName"].value) ||
      !$formStudent["usernameStudent"].value.length ||
      !$formStudent["passwordStudent"].value.length
    ) {
      const value = $formStudent["studentName"].value;
      const web = $formStudent["usernameStudent"].value;
      const pass = $formStudent["passwordStudent"].value;

      $formStudent["studentName"].value = "* Enter student name";
      $formStudent["usernameStudent"].value = "* Enter user student";
      $formStudent["passwordStudent"].value = "* Enter a valid password";

      setTimeout(() => {
        $formStudent["studentName"].value = value;
        $formStudent["usernameStudent"].value = web;
        $formStudent["passwordStudent"].value = pass;
      }, 1500);

      return;
    }
    const activity = {
      studentName: $formStudent["studentName"].value,
      lastNameStudent: $formStudent["lastNameStudent"].value,
      emailStudent: $formStudent["emailStudent"].value,
      birthdayStudent: $formStudent["birthdayStudent"].value,
      genderStudent: $formStudent["genderStudent"].value,
      usernameStudent: $formStudent["usernameStudent"].value,
      passwordStudent: $formStudent["passwordStudent"].value,
      membershipStudent: $formStudent["membershipStudent"].value,
      commentstudent: editor.getContents(),
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
        studentp();
        load();
        $formStudent.reset();
        alertManager("success", "Created Successfully");
        editor.value("hola");
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
  if (e.target.matches(".edit-student")) {
    $titleStudent.textContent = "Modify students";
    $btnStudent.value = "Save Changes";
    $btnStudent.classList.toggle("edit-two");
    $btnStudent.classList.toggle("btn-submit");
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

/*---------------------------------------------------PUT Method---------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    const valueStudents = {
      id: $formStudent.idi.value,
      studentName: $formStudent.studentName.value,
      lastNameStudent: $formStudent.lastNameStudent.value,
      emailStudent: $formStudent.emailStudent.value,
      birthdayStudent: $formStudent.birthdayStudent.value,
      genderStudent: $formStudent.genderStudent.value,
      usernameStudent: $formStudent.usernameStudent.value,
      passwordStudent: $formStudent.passwordStudent.value,
      membershipStudent: $formStudent.membershipStudent.value,
      commentstudent: editor.getContents(),
    };

    /*   if (
      !$formStudent["sponsorName"].value.length ||
      !$formStudent["sponsorWebsite"].value.length
    ) {
      const value = $formStudent["sponsorName"].value;
      const web = $formStudent["sponsorWebsite"].value;

      $formStudent["sponsorName"].value = "* Enter sponsor name";
      $formStudent["sponsorWebsite"].value = "* Enter the Sponsor's Website";

      setTimeout(() => {
        $formStudent["sponsorName"].value = value;
        $formStudent["sponsorWebsite"].value = web;
      }, 1500);

      return;
    } */

    fetch(`${API_URL}/${valueStudents.id}`, {
      method: "PUT",
      body: JSON.stringify(valueStudents),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        alertManager("error", error);
      })
      .then((response) => {
        $btnStudent.value = "Add new student";
        load();
        alertManager("update", "Edit Successfully");
        document.querySelector(".crud-form-student").reset();
        $btnStudent.classList.toggle("edit-two");
        $btnStudent.classList.toggle("btn-submit");
        $titleStudent.textContent = "Create New student";
      });
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

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-student")) {
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
            studentp();
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
    [
      "undo",
      "redo",
      "font",
      "fontSize",
      "formatBlock",
      "paragraphStyle",
      "blockquote",
    ],

    [
      "bold",
      "underline",
      "italic",
      "strike",
      "fontColor",
      "hiliteColor",
      "textStyle",
    ],
    ["align", "horizontalRule", "list", "lineHeight", "fullScreen"],

    "/", // Line break
  ],

  height: 250,

  lang: SUNEDITOR_LANG["en"],
});

editor.setDefaultStyle("font-family: Arial; font-size: 20px;");


const change = d.querySelector(".gender-student");
change.addEventListener("click", (e) => {
  alert("cambio");
});

const ctx = d.querySelector("#myChart");

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
