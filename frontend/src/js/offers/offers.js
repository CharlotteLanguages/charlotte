const d = document,
  API_URL = `http://localhost:3000/promotion`,
  $formOffer = d.querySelector(".crud-form-promotion"),
  $titleOffer = d.querySelector(".crud-title-promotion"),
  $btnOffer = d.getElementById("create-promotion"),
  $tableOffer = d.querySelector(".crud-table-promotion"),
  activity = d.querySelector(".table-promotion"),
  $modal = document.querySelector(".cont-p-promotion"),
  $formDelete = d.querySelector(".form-delete"),
  $fragmentOffer = d.createDocumentFragment();

/*-------------------------------------------------------------------------------------------------- */

export function ModalShowPromotions(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-promotion");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-promotion");
    }
  });
}

/*------------------------------------------------------------------------------------------------------------- */


export function openFormPromotions(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
      setCurrentDate();
      d.querySelector("#alert").style.display = "none";
      d.querySelector(".tooltip").classList.remove("show_tooltip");
      
    }
   
    if (e.target.matches(btnclose)) {
      load();
      $formOffer.reset();
      d.querySelector(".tooltip").classList.remove("show_tooltip");
    }
  });
}


/*------------------------------------------------------------------------------ */

function setCurrentDate(){
  let currentDate = new Date(),
        currentDay = currentDate.getDate(),
        monthNumber = currentDate.getMonth() + 1,
        currentYear = currentDate.getFullYear()
        console.log(currentDay)
        /* año = currentDate.toLocaleString(),
        año1 = currentDate.toLocaleDateString(),
        año2 = currentDate.toLocaleTimeString(); */
      if (monthNumber < 10 )  monthNumber = `0${monthNumber}`;  
      if(currentDay <10)  currentDay = `0${currentDay}`
      d.querySelector(".input-DateEnd-promotion").setAttribute("min",`${currentYear}-${monthNumber}-${currentDay}T00:00`);
      d.querySelector(".input-DateStart-promotion").setAttribute("min",`${currentYear}-${monthNumber}-${currentDay}T00:00`);

}


/*--------------------------------------------------------------------------------------------------- */

function showSortedDate(){
  d.querySelectorAll(".dataEnd").forEach(element => {
    const day =  element.textContent.slice(0,10).split("-").reverse().join("-");
    const hour =  element.textContent.slice(11,16);
    element.textContent = `${day} ${hour}`
  });
}



/*---------------------------------------------------------------------------- */

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Offer Title</th>
    <th>Price</th>
    <th>Offer</th>
    <th>Date</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

/*----------------------------------------------------------------------------------------------- */



let offer = [];
export const getOfferData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-promotion");
      table.innerHTML = `<div class = "no-activities">NO OFFERS YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A OFFER</div`;
      }, 4000);
    } else {
      offer = json;
      renderPromotionData(offer);
      showSortedDate()
    }
  } catch (err) {
    const table = d.querySelector(".crud-table-promotion");
    table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`;
  }
};


/*--------------------------------------------------------------------------------- */

const renderPromotionData = (prom) => {
  let codigo = "";
  prom.reverse().forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td data-label = "ID">${ele.id}</td>
    <td data-label = "Offer Title">${ele.promotionTitle}</td>
    <td data-label = "Price">${ele.promotionPrice}</td>
    <td data-label = "Offer">${ele.promotionOffer}</td>
    <td data-label = "Date" class = "dataEnd">${ele.promotionDateEnd}</td>
    <td data-label = "Actions">
        <div class="icons-promotion">
        <i class="fas fa-dot-circle read-promotion" data-ids = ${ele.id}></i>
        <i class="fas fa-pen edit-promotion" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-promotion" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragmentOffer.appendChild($tr); 
   
  });
  $tableOffer.innerHTML = CodeTh();
  $tableOffer.appendChild($fragmentOffer);
};



/*-----------------------------------------------------Btn Read show------------------------------------------- */
const openModalEditor = (e) =>{
  if (e.target.matches(".read-promotion")) {
    d.querySelector("#modal-container-promotion").style.opacity = "1";
    d.querySelector("#modal-container-promotion").style.visibility = "visible";
    d.querySelector(".modal-promotion").classList.toggle("modal-clp");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    let id = e.target.dataset.ids,
      promo = {};
    offer.filter((prom) => {
      if (prom.id == id) {
        promo = prom;
      }
    });
  
    if (promo.promotioDescription == "<p><br></p>") {
      let c = `<div class = "no-description">Empty section</div>`;
      $modal.innerHTML = c;
    } else {
      let codigo = `
      <div>${promo.promotioDescription}</div>`;
      $modal.innerHTML = codigo;
    }
  }

}

/*-------------------------------------------------------------------------------------- */
const closeModalEditor = (e)=>{
  if (e.target.matches(".close")) {
    d.querySelector(".modal-promotion").classList.toggle("modal-clp");
    setTimeout(() => {
      d.querySelector("#modal-container-promotion").style.opacity = "0";
      d.querySelector("#modal-container-promotion").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }
}


/*---------------------------------------------------------------------------------------------------- */


const openOfferEditForm = (e)=>{
  if (e.target.matches(".edit-promotion")) {
    $titleOffer.textContent = "Modify Offer";
    $btnOffer.value = "Save Changes";
    d.querySelector("#alert").style.display = "none";
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    setCurrentDate();
  
    let id = e.target.dataset.id,
      promo = {};
    offer.filter((prom) => {
      if (prom.id == id) {
        promo = prom;
      }
    });
  
    $formOffer.idi.value = id;
    $formOffer.promotionTitle.value = promo.promotionTitle;
    $formOffer.promotionPrice.value = promo.promotionPrice;
    $formOffer.promotionOffer.value = promo.promotionOffer;
    $formOffer.promotionDateStart.value = promo.promotionDateStart;
    $formOffer.promotionDateEnd.value = promo.promotionDateEnd;
    $formOffer.promotionCategory.value = promo.promotioCategory;
    editor.setContents(`${promo.promotioDescription}`);
    load();;
  }

}

/*-------------------------------------------------------------------------------------- */

d.addEventListener("submit", async (e) => {
  if (e.target === $formOffer) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              promotionTitle: e.target.promotionTitle.value,
              promotionPrice: e.target.promotionPrice.value,
              promotionOffer: e.target.promotionOffer.value,
              promotionDateStart: e.target.promotionDateStart.value,
              promotionDateEnd: e.target.promotionDateEnd.value,
              promotioCategory: e.target.promotionCategory.value,
              promotioDescription: editor.getContents(),
            }),
          },
          res = await fetch(API_URL, options),
          json = await res.json();
        getOfferData();
        load();
        $formOffer.reset();
        alertManager("success", "Created Successfully");
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
              promotionTitle: e.target.promotionTitle.value,
              promotionPrice: e.target.promotionPrice.value,
              promotionOffer: e.target.promotionOffer.value,
              promotionDateStart: e.target.promotionDateStart.value,
              promotionDateEnd: e.target.promotionDateEnd.value,
              promotioCategory: e.target.promotionCategory.value,
              promotioDescription: editor.getContents(),
            }),
          },
          res = await fetch(
            `${API_URL}/${e.target.idi.value}`,
            options
          ),
          json = await res.json();
       
        restartFormValues(e);
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
      }
    }
  }
});



/*------------------------------------------------------- */


function restartFormValues(e) {
  load();
  getOfferData();
  alertManager("update", "Edit Successfully");
  openEditingForm("Create new offer", "Create offer");
  $formOffer.reset();
  e.target.idi.value = "";
  d.querySelector(".tooltip").classList.remove("show_tooltip");
  
}


/*------------------------------------------------------------------- */

function openEditingForm(title, btn) {
  $titleOffer.textContent = title;
  $btnOffer.value = btn;

}


const removeOffer = (e)=>{
  if (e.target.matches(".remove-promotion")) {
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
            getOfferData();
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



/* -------------------------------load -----------------------------*/

function load() {
  d.querySelector(".cont-tables-promotion").classList.toggle(
    "up-table-promotion"
  );
  d.querySelector(".cont-new-promotion").classList.toggle(
    "open-form-promotion"
  );
  d.querySelector("#container-noti").classList.toggle("noticia");
}


/*------------------------------------------------------------------------------- */

const editor = SUNEDITOR.create(document.querySelector(".txtarea-promotion"), {
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






const vc = d.querySelector(".cont-table-promotion_blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});

const showSideBar = (e) => {
  if (e.target.matches(".fa-bars")) {
    setTimeout(() => {
      e.target.classList.toggle("changeColor");
    }, 500);
    d.querySelector(".menu").classList.toggle("move-menu");
  }
};


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
  openModalEditor(e);
  openOfferEditForm(e)
  closeModalEditor(e);
  showSideBar(e);
  removeOffer(e);
});