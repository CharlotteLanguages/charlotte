const d = document,
  API_URL = `http://localhost:3000/membership`,
  $formMember = d.querySelector(".crud-form-member"),
  $titleMember = d.querySelector(".crud-title-member"),
  $btnMember = d.getElementById("create-member"),
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
      $formMember.reset();
      d.querySelector("#alert").style.display = "none";
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
export const getMembershipData = async () => {
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
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "Name">${ele.memberName}</td>
    <td data-label = "Category">${ele.memberCategory}</td>
    <td data-label = "Membership">${ele.memberPrice}</td>
    <td data-label = "Actions">
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


/*-----------------------------------------------------Btn Read show------------------------------------------- */

/* const openModalEditor = (e)=>{
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
    members.memberDescription == "<p><br></p>"
    ? ($modal.innerHTML =  `<div class = "no-description">Empty section</div>`)
    : ($modal.innerHTML =  `<div>${members.memberDescription}</div>`)
 
  }

}
 */
/*----------------------------------------------------------------------------------------------- */

const closeModalEditor =(e)=>{
  if (e.target.matches(".close")) {
    d.querySelector(".modal-member").classList.toggle("modal-clm");
    setTimeout(() => {
      d.querySelector("#modal-container-member").style.opacity = "0";
      d.querySelector("#modal-container-member").style.visibility = "hidden";
    }, 700);
    
  }

}


/*----------------------------------------------------------------- */
const openMembershipEditForm=(e)=>{
  if (e.target.matches(".edit-member")) {
    $titleMember.textContent = "Modify Membership";
    $btnMember.value = "Save Changes";
    $btnMember.classList.toggle("edit-two");
    $btnMember.classList.toggle("btn-submit");

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
}




/*--------------------------------POST ana PUT METHOD */

d.addEventListener("submit", async (e) => {
  if (e.target === $formMember) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              memberName: e.target.memberName.value,
              memberCategory:e.target.memberCategory.value,
              memberPrice: e.target.memberPrice.value,
              memberDescription: editor.getContents(),
              
            }),
          },
          res = await fetch(API_URL, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        getMembershipData();
        load();
        $formMember.reset();
        alertManager("success", "Created Successfully");
/*         d.querySelector(".text-membership").style.display = "inline";
        d.querySelector(".text-gender").style.display = "inline"; */
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
              memberName: e.target.memberName.value,
              memberCategory:e.target.memberCategory.value,
              memberPrice: e.target.memberPrice.value,
              memberDescription: editor.getContents(),
            }),
          },
          res = await fetch(
            `http://localhost:3000/membership/${e.target.idi.value}`,
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


/*------------------------------------------------------------- */

function restartFormValues(){
  $btnMember.value = "Create membership";
  $titleMember.textContent = "Create new membership";
  load();
  alertManager("update", "Edit Successfully");
  $formMember.reset();
  e.target.idi.value = "";
  getMembershipData();
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
  }, 2000);
}



/* d.addEventListener("click", (e) => {
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
        getMembershipData();
        load();
        alertManager("update", "Edit Successfully");
        $btnMember.classList.toggle("edit-two");
        $btnMember.classList.toggle("btn-submit");
        $btnMember.value = "Add New Membership";
        $formMember.reset();
      });
  }
}); */



function load() {
  d.querySelector(".cont-tables-member").classList.toggle("up-table-member");
  d.querySelector(".cont-new-member").classList.toggle("open-form-member");
  d.querySelector("#container-noti").classList.toggle("noticia");
}

/*--------------------------------------------------------------------------------------- */


const editor = SUNEDITOR.create(document.querySelector(".txtarea-member"), {
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
  maxWidth: "1200px",
  lang: SUNEDITOR_LANG["en"],
});

editor.setDefaultStyle("font-family: Arial; font-size: 13px;");




/*--------------------------------------------------------------------------------------- */
const vc = d.querySelector(".cont-table-member_blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});


const showSideBar = (e)=>{
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
}

d.addEventListener("click", (e) => {
  openModalEditor(e);
  closeModalEditor(e);
  openMembershipEditForm(e)
  removeMembership(e);
  showSideBar(e);
});
