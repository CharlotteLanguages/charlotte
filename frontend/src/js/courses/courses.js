const d = document,
  API_URL = `http://localhost:3000/course`,
  $formCourse = d.querySelector(".crud-form-course"),
  $titleCourse = d.querySelector(".crud-title-course"),
  $tbnCourse = d.getElementById("create-course"),
  $fragmentCourse = d.createDocumentFragment(),
  $tableCourse = d.querySelector(".crud-table-course"),
  $formDelete = d.querySelector(".form-delete"),
  $modal = document.querySelector(".cont-p-course");

export function ShowCourses(btnOpen, btnClose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnOpen)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-course");
    }
    if (e.target.matches(btnClose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-course");
    }
  });
}

export function openFormCourses(btnOpen, btnClose) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnOpen)) {
      editor.setContents(``);
      load();
    }
    if (e.target.matches(btnClose)) {
      load();
      $formCourse.reset();
    }
  });
}

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

export const getCourseData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json(),
      course = [];
    if (json.length <= 0) {
      const tables = d.querySelector(".crud-table-course");
      tables.innerHTML = `<div class = "no-activities">NO COURSES YET</div>`;
      setTimeout(() => {
        tables.innerHTML = `<div class = "no-activities add">ADD A COURSE</div`;
      }, 4000);
      return;
    }
    course = json;
    passInformation(course);
    /*     if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

/* -------------------------------------------render courses------------------------------------------ */
function passInformation(course) {
  printCoursesData(course);
  openWindowModal(course);
  loadDataForEditing(course);
}

const printCoursesData = (course) => {
  course.forEach((ele) => {
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

/*---------------------------------------------------------------Method Post-------------------------------*/

function getDataFromForm() {
  return {
    id: $formCourse.idi.value,
    courseTitle: $formCourse.courseTitle.value,
    category: $formCourse.category.value,
    price: $formCourse.price.value,
    description: editor.getContents(),
  };
}

export const addCourse = () => {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".btn-submit")) {
      const cour = {
        courseTitle: $formCourse.courseTitle.value,
        category: $formCourse.category.value,
        price: $formCourse.price.value,
        description: editor.getContents(),
      };
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(cour),
        headers: { "content-Type": "application/json" },
      })
        .then((res) => {
          res.json();
        })
        .catch((error) => {
          alertManager("error", error);
        })
        .then((res) => {
          load();
          getCourseData();
          alertManager("success", "Created Successfully");
          $formCourse.reset();
        });
    }
  });
};

/*-----------------------------------------------------Btn Read show------------------------------------------- */
const addStyles = () => {
  d.querySelector("#modal-container-course").style.opacity = "1";
  d.querySelector("#modal-container-course").style.visibility = "visible";
  d.querySelector(".modal-course").classList.toggle("modal-cl");
};

function openWindowModal(course) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".read-course")) {
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
  });
}

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
  $tbnCourse.classList.toggle("edit-two");
  $tbnCourse.classList.toggle("btn-submit");
}

function loadDataForEditing(course) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".edit-course")) {
      openEditingForm("Modify Courses", "Save Changes");
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
  });
}

/*--------------------------------------------------------Put Method ---------------------------- */

export function editCourse() {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".edit-two")) {
      fetch(`${API_URL}/${getDataFromForm().id}`, {
        method: "PUT",
        body: JSON.stringify(getDataFromForm()),
        headers: {
          "content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => {
          alertManager("error", error);
        })
        .then((response) => {
          load();
          getCourseData();
          alertManager("update", "Edit Successfully");
          openEditingForm("Create new course", "Add New Course");
          $formCourse.reset();
          $titleCourse.textContent = "Create new course";
          setTimeout(() => {
            location.reload();
          }, 1500);
        });
    }
  });
}

/*----------------------------------------------Method Delete----------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-course")) {
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
});

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
  }, 2000);
}

/* ---------------------------------------------- Editor -------------------------------------------------------- */

const editor = SUNEDITOR.create(document.querySelector(".txtarea-course"), {
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
      "subscript",
      "superscript",
      "fontColor",
      "hiliteColor",
      "textStyle",
    ],
    [
      "removeFormat",
      "outdent",
      "indent",
      "align",
      "horizontalRule",
      "list",
      "lineHeight",
    ],
    ["link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
    ["fullScreen", "showBlocks", "codeView", "table"],
    ["preview", "print"],
    ["save", "template", "codeView"],
    ["dir", "dir_ltr", "dir_rtl"],
  ],
  height: 435,
  lang: SUNEDITOR_LANG["en"],
});
editor.setDefaultStyle("font-family: Arial; font-size: 20px;");
const vc = d.querySelector(".cont-table-course_blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});


d.addEventListener("click", (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
});
