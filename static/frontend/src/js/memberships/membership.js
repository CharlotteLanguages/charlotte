const d = document,
  API_URL = `http://localhost:3000/membership`,
  $formMember = d.querySelector(".crud-form-member"),
  $titleMember = d.querySelector(".crud-title-member"),
  $tbnMember = d.getElementById("create-member"),
  $tableMember = d.querySelector(".crud-table-member"),
  activity = d.querySelector(".table-member"),
  $modal = document.querySelector(".cont-p-member"),
  $formDelete = d.querySelector(".form-delete"),
  $fragmentMember = d.createDocumentFragment();

export function ModalRemoveMember(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    /*     if (e.target.matches(btnshow)) {
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

export function ModalShowMember(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-member");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-member");
    }
  });
}

export function openFormMember(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
    }
    if (e.target.matches(btnclose)) {
      load();
      $formMember.reset();
    }
  });
}
/* const activity = d.querySelector(".table-promotion"); */

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Membership</th>
    <th>Category</th>
    <th>Price</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

let membership = [];
export const memberp = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    /*  if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-member");
      table.innerHTML = `<div class = "no-activities">NO MEMBERSHIPS YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A MEMBERSHIP</div`;
      }, 4000);
    } else {
      membership = json;
      renderMember(membership);
    }
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

const renderMember = (membe) => {
  let codigo = "";
  membe.forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.memberName}</td>
    <td>${ele.memberCategory}</td>
    <td >${ele.memberPrice}</td>
    <td>
        <div class="icons-member">
        <i class="fas fa-dot-circle read-member" data-ids = ${ele.id}></i>
        <i class="fas fa-pen edit-member" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-member" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragmentMember.appendChild($tr);
  });
  $tableMember.innerHTML = CodeTh();
  $tableMember.appendChild($fragmentMember);
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-submit")) {
    e.preventDefault();
    const memberPost = {
      memberName: $formMember["memberName"].value,
      memberCategory: $formMember["memberCategory"].value,
      memberPrice: $formMember["memberPrice"].value,
      memberDescription: editor.getContents(),
    };
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(memberPost),
      headers: { "content-Type": "application/json" },
    })
      .then((res) => {
        res.json();
      })
      .catch((error) => {
        alertManager("error", error);
      })
      .then((res) => {
        memberp();
        load();
        $formMember.reset();
        alertManager("success", "Created Successfully");
      });
  }
});

/* d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-member")) {
    let id = e.target.dataset.idr;
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((error) => {
        alertManager("error", error);
      })
      .then((res) => {
        memberp();
        alertManager("deleted", "Deleted Successfully");
      });
  }
}); */

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-member")) {
    d.querySelector("#modal-container-d").style.opacity = "1";
    d.querySelector("#modal-container-d").style.visibility = "visible";
    d.querySelector(".modal-d").classList.toggle("modal-close-d");
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
            d.querySelector(".modal-d").classList.toggle("modal-close-d");
            setTimeout(() => {
              d.querySelector("#modal-container-d").style.opacity = "0";
              d.querySelector("#modal-container-d").style.visibility = "hidden";
            }, 700);
            memberp();
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

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-member")) {
    $titleMember.textContent = "Modify Membership";
    $tbnMember.value = "Save Changes";
    $tbnMember.classList.toggle("edit-two");
    $tbnMember.classList.toggle("btn-submit");

    let id = e.target.dataset.id,
      member = {};
    membership.filter((memb) => {
      if (memb.id == id) {
        member = memb;
      }
    });

    $formMember.idi.value = id;
    $formMember.memberName.value = member.memberName;
    $formMember.memberPrice.value = member.memberPrice;
    $formMember.memberCategory.value = member.memberCategory;
    editor.setContents(`${member.memberDescription}`);
    load();
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    const activity = {
      id: $formMember.idi.value,
      memberName: $formMember.memberName.value,
      memberPrice: $formMember.memberPrice.value,
      memberCategory: $formMember.memberCategory.value,
      memberDescription: editor.getContents(),
    };

    fetch(`${API_URL}/${activity.id}`, {
      method: "PUT",
      body: JSON.stringify(activity),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        alertManager("error", error);
      })
      .then((response) => {
        memberp();
        load();
        alertManager("update", "Edit Successfully");
        $tbnMember.classList.toggle("edit-two");
        $tbnMember.classList.toggle("btn-submit");
        $tbnMember.value = "Add New Membership";
        $formMember.reset();
      });
  }
});

/*-----------------------------------------------------Btn Read show------------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".read-member")) {
    d.querySelector("#modal-container-member").style.opacity = "1";
    d.querySelector("#modal-container-member").style.visibility = "visible";
    d.querySelector(".modal-member").classList.toggle("modal-clm");
    let id = e.target.dataset.ids,
      members = {};
    membership.filter((el) => {
      if (el.id == id) {
        members = el;
      }
    });

    if (members.memberDescription == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${members.memberDescription}</div>`;
      $modal.innerHTML = codigo;
    }
  }
  if (e.target.matches(".poi")) {
    d.querySelector(".modal-member").classList.toggle("modal-clm");
    setTimeout(() => {
      d.querySelector("#modal-container-member").style.opacity = "0";
      d.querySelector("#modal-container-member").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }
});

function load() {
  d.querySelector(".cont-tables-member").classList.toggle("up-table-member");
  d.querySelector(".cont-new-member").classList.toggle("open-form-member");
  d.querySelector("#container-noti").classList.toggle("noticia");
}

const editor = SUNEDITOR.create(document.querySelector(".txtarea-member"), {
  codeMirror: CodeMirror,
  buttonList: [
    ["undo", "redo"],
    ["font", "fontSize", "formatBlock"],
    ["paragraphStyle", "blockquote"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat"],
    "/", // Line break
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "lineHeight"],
    ["table", "link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
    ["imageGallery"],
    ["fullScreen", "showBlocks", "codeView"],
    ["preview", "print"],
    ["save", "template"],
    ["codeView"],
    ["dir", "dir_ltr", "dir_rtl"],
  ],
  height: 450,

  lang: SUNEDITOR_LANG["en"],
});
const vc = d.querySelector(".cont-table-member_blue");

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
