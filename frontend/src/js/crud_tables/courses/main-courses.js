import { bodyTable, headTable } from "./courses.js";
import { editor } from "./editor.js";
import {alertManager, showSideBar,openModalDelete, closeWindowModal} from "../generalCode/generalCode.js";

const d = document,
  API_URL = `https://apicharlotte.up.railway.app/course`,
  $formCourse = d.querySelector(".crud-form-course"),
  $titleCourse = d.querySelector(".crud-title-course"),
  $tbnCourse = d.getElementById("create-course"),
  $fragmentCourse = d.createDocumentFragment(),
  $tableCourse = d.querySelector(".crud-table-course"),
  $formDelete = d.querySelector(".form-delete-dr"),
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
    const $tr = d.createElement("tr")
 
    $tr.innerHTML = bodyTable(ele);
    $fragmentCourse.appendChild($tr);
  });
  $tableCourse.innerHTML = headTable();
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
      if (el.idCurso == id) courses = el;
    });

    courses.detalles == "<p><br></p>"
      ? ($modal.innerHTML = `<div class = "no-description">Empty section</div>`)
      : ($modal.innerHTML = `<div>${courses.detalles}</div>`);
  }

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
      if (el.idCurso == id) cours = el;
    });

    $formCourse.idi.value = cours.idCurso;
    $formCourse.courseTitle.value = cours.titulo;
    $formCourse.category.value = cours.categoria;
    $formCourse.price.value = cours.precio;
    editor.setContents(`${cours.detalles}`);
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
              titulo: e.target.courseTitle.value,
              categoria: e.target.category.value,
              precio: e.target.price.value,
              detalles: editor.getContents(),
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
              titulo: e.target.courseTitle.value,
              categoria: e.target.category.value,
              precio: e.target.price.value,
              detalles: editor.getContents(),
            }),
          },
          res = await fetch(`${API_URL}/${e.target.idi.value}`,options),
          json = await res.json();
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

const removeCourse = (e) => {
  if (e.target.matches(".remove-course")) {
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
                body: JSON.stringify({
                  reasonDeleteCourses: e.target.reasonDelete.value,
                }),
              },
              res = await fetch("http://localhost:3000/reasonDeleteCourses", options),
              json = await res.json();

          } catch (error) {console.log("reason not added")}


          try {
            let res = await fetch(`${API_URL}/${id}`, { method: "DELETE" }),
              json = await res.json();

            $formDelete.reset();
            getCourseData();
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





function load() {
  d.querySelector(".cont-tables-course").classList.toggle("up-table-course");
  d.querySelector(".cont-new-course").classList.toggle("open-form-course");
  d.querySelector("#container-noti").classList.toggle("noticia");
}



/*-------------------------------------------------------------------------------------------------------------- */


const vc = d.querySelector(".cont-table-course_blue");
window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});





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


d.addEventListener("DOMContentLoaded", (e) => {
  getCourseData();

});

/* ModalRemoveCourses(".remove", ".close-dc", "#modal-container-dc", ".modal-dc"); */
openFormCourses(".btn-courses", ".cancel-course");

/* closeWindowModal(
  ".poi",
  "#modal-container-course",
  ".modal-course",
  "modal-cl"
);
 */
closeWindowModal(".close", ".modal-course","#modal-container-course", "modal-cl");