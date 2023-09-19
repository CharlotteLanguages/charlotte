
import { bodyTable, headTable } from "./student.js";
import { editor } from "./editor.js";
import {alertManager, showSideBar,openModalDelete, closeWindowModal} from "../generalCode/generalCode.js";

/*-----------------------------------------daclare const -----------------------------*/

const d = document,
  API_URL = `https://apicharlotte.up.railway.app/student`,
  API_URLMMBERSIP = `https://apicharlotte.up.railway.app/membership`,
  ApiReasonDelete = `http://localhost:3000/reasonDeleteStudent`,
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

d.addEventListener("click", (e) => {
  if (e.target.matches(".text-membership")) {
    d.querySelector(".membership-student").click();
  }
});


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
      renderStudentData()
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-student");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};


const addStyles = () => {
  d.querySelector("#modal-container-student").style.opacity = "1";
  d.querySelector("#modal-container-student").style.visibility = "visible";
  d.querySelector(".modal-student").classList.toggle("modal-clos");
};

/*------------------------------------------------------------------------------------------------ */

const openModalEditor = (e) => {
  if (e.target.matches(".read-student")) {
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      students = {};
    addStyles();
    student.filter((el) => {
      if (el.idPerson == id) students = el;
    });
    let code = ``;
    $modal.innerHTML = code;
  }
};

/*---------------------------------------------------------------------------------------------- */

const openStudentEditForm = async (e) => {
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
      if (el.idPerson == id) students = el;
  
      
    });

    let res = await fetch(API_URLMMBERSIP),
      json = await res.json();

      if(students.idMembership_fk == null){

        $formStudent.idi.value = id;
        $formStudent.studentName.value = students.name;
        $formStudent.lastNameStudent.value = students.lastName;
        $formStudent.emailStudent.value = students.email;
        $formStudent.birthdayStudent.value = students.birthDate;
        $formStudent.genderStudent.value = students.gender;
        $formStudent.usernameStudent.value = students.userName;
        $formStudent.passwordStudent.value = students.password;;
        $formStudent.membershipStudent.value = "No Membersip";
        editor.setContents(`${students.detail}`);
        getStudentData();
        load();
      }

      json.map(ele=>{
        
        if(students.idMembership_fk== ele.idMembership){
          $formStudent.idi.value = id;
          $formStudent.studentName.value = students.name;
          $formStudent.lastNameStudent.value = students.lastName;
          $formStudent.emailStudent.value = students.email;
          $formStudent.birthdayStudent.value = students.birthDate;
          $formStudent.genderStudent.value = students.gender;
          $formStudent.usernameStudent.value = students.userName;
          $formStudent.passwordStudent.value = students.password;
          $formStudent.membershipStudent.value = ele.afiliacion;
          editor.setContents(`${students.detail}`);
          getStudentData();
          load();

        }
    
      })

  }
};

/*--------------------------------------------------POST and PUT Method----------------------------------------- */

async function renderStudentData(){

  let response = await fetch(API_URL),
  json = await response.json(),
  response2 = await fetch(API_URLMMBERSIP),
  json1 = await response2.json();


 json.reverse().map((ele) => {
  json1.map((eles) => {
    if (ele.idMembership_fk == eles.idMembership) ele.idMembership_fk = eles.afiliacion;
  });

  if (ele.idMembership_fk == null) ele.idMembership_fk = "No membership";
  const $tr = d.createElement("tr");
  $tr.innerHTML = bodyTable(ele);
  $fragment.appendChild($tr);

});
$tableStudent.innerHTML = headTable();
$tableStudent.appendChild($fragment);
}




d.addEventListener("submit", async (e) => {
  if (e.target === $formStudent) {
    e.preventDefault();
    let response2 = await fetch(API_URLMMBERSIP), 
    json1 = await response2.json(), options
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        json1.map(ele=>{
          if(e.target.membershipStudent.value== ele.afiliacion){     
            options = {
               method: "POST",
               headers: { "Content-type": "application/json" },
               body: JSON.stringify({
                 name: e.target.studentName.value,
                 lastName: e.target.lastNameStudent.value,
                 email: e.target.emailStudent.value,
                 birthDate: e.target.birthdayStudent.value,
                 gender: e.target.genderStudent.value,
                 userName: e.target.usernameStudent.value,
                 password: e.target.passwordStudent.value,
                 idMembership_fk: ele.idMembership,
                 detail: editor.getContents(),
               })
             }  
          }
        })
        
          let res = await fetch(API_URL, options),
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
        let options1
        json1.map(ele=>{
          if(e.target.membershipStudent.value== ele.afiliacion){     
            options1 = {
               method: "PUT",
               headers: { "Content-type": "application/json" },
               body: JSON.stringify({
                 name: e.target.studentName.value,
                 lastName: e.target.lastNameStudent.value,
                 email: e.target.emailStudent.value,
                 birthDate: e.target.birthdayStudent.value,
                 gender: e.target.genderStudent.value,
                 userName: e.target.usernameStudent.value,
                 password: e.target.passwordStudent.value,
                 idMembership_fk: ele.idMembership,
                 detail: editor.getContents(),
               })
             }  
          } 
        })
        
         let res = await fetch(`${API_URL}/${e.target.idi.value}`,options1),
          json = await res.json();

        getStudentData();
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

/*------------------------------------------------------------------------------- */

function load() {
  
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

/*------------------------------------------------------------------ */


const removeStudent = (e) => {
  if (e.target.matches(".remove-student")) {
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
                body: JSON.stringify({ reasonDeleteStudent: e.target.reasonDelete.value}
                  )},
              res = await fetch(ApiReasonDelete,options),
              json = await res.json();

          } catch (error) {console.log("reason not added")}


          try {
            let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" }),
              json = await res.json();

            $formDelete.reset();
            getStudentData();
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


/*------------------------------------------------------------------------*/

const vc = d.querySelector(".cont-table-student_blue"),
  vd = d.querySelector(".cont-tables-student");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});

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

d.addEventListener("click", (e) => {
  openStudentEditForm(e);
/*   closeModalDelete(e); */
  showSideBar(e);
  openModalEditor(e);
  removeStudent(e);
});

export const notificationWindow = ( fabell, tooltip, showtooltip, navicon, container) => {
  d.addEventListener("click", (e) => {
    if (e.target.matches(fabell)) {
      d.querySelector(tooltip).classList.toggle(showtooltip);
    }
    if (e.target.matches(navicon) || e.target.matches(container)) {
      d.querySelector(tooltip).classList.remove(showtooltip);
    }
    /* 
    if (e.target.matches(".notifications")) {
      d.querySelector(".tooltip_message").classList.toggle("show_notifications");
      d.querySelector(".tooltip").classList.remove("show_tooltip");
      d.querySelector(".open_tooltip").classList.add("fa-chevron-down");
      d.querySelector(".open_tooltip").classList.remove("fa-chevron-up");
    } */
  });
};

/* window.addEventListener("load", () => {
  document.getElementById("loader").classList.toggle("loader2");
});
 */

d.addEventListener("DOMContentLoaded", (e) => {
  getStudentData();
});

openFormStudent(".btn-student",".cancel-student",".cont-new-student",".cont-tables-student");
closeWindowModal(".close", ".modal-student","#modal-container-student", "modal-clos");
notificationWindow(".fa-bell",".tooltip", "show_tooltip",".nav__icon", "#container");