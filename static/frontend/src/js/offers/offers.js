const d = document,
  API_URL = `http://localhost:3000/promotion`,
  $formPromotion = d.querySelector(".crud-form-promotion"),
  $titlePromotion = d.querySelector(".crud-title-promotion"),
  $tbnPromotion = d.getElementById("create-promotion"),
  $tablePromotion = d.querySelector(".crud-table-promotion"),
  activity = d.querySelector(".table-promotion"),
  $modal = document.querySelector(".cont-p-promotion"),
  $formDelete = d.querySelector(".form-delete"),
  $fragmentPromotion = d.createDocumentFragment();

export function ModalRemovePromotions(
  btnshow,
  btnclose,
  modalContainer,
  modal
) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      console.log(e.target);
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-d");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-d");
    }
  });
}

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

export function openFormPromotions(btnshow, btnclose, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      editor.setContents(``);
      load();
      let currentDate = new Date(),
        currentDay = currentDate.getDate(),
        monthNumber = currentDate.getMonth() + 1,
        currentYear = currentDate.getFullYear(),
        año = currentDate.toLocaleString(),
        año1 = currentDate.toLocaleDateString(),
        año2 = currentDate.toLocaleTimeString();
      if (monthNumber < 10) {
        monthNumber = `0${monthNumber}`;
      }
      d.querySelector(".input-DateEnd-promotion").setAttribute(
        "min",
        `${currentYear}-${monthNumber}-${currentDay}T00:00`
      );
      d.querySelector(".input-DateStart-promotion").setAttribute(
        "min",
        `${currentYear}-${monthNumber}-${currentDay}T00:00`
      );
    }
    if (e.target.matches(btnclose)) {
      load();
      $formPromotion.reset();
    }
  });
}
/* const activity = d.querySelector(".table-promotion"); */

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

let promotion = [];
export const promotionp = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
    /*  if (!res.ok) throw { status: res.status, statusText: res.statusText }; */
    if (json.length <= 0) {
      const table = d.querySelector(".crud-table-promotion");
      table.innerHTML = `<div class = "no-activities">NO OFFERS YET</div>`;
      setTimeout(() => {
        table.innerHTML = `<div class = "no-activities add">ADD A OFFER</div`;
      }, 4000);
    } else {
      promotion = json;
      renderPromotion(promotion);
    }
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
  }
};

const renderPromotion = (prom) => {
  let codigo = "";
  prom.forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.promotionTitle}</td>
    <td>${ele.promotionPrice}</td>
    <td>${ele.promotionOffer}</td>
    <td>${ele.promotionDateEnd}</td>
    <td>
        <div class="icons-promotion">
        <i class="fas fa-dot-circle read-promotion" data-ids = ${ele.id}></i>
        <i class="fas fa-pen edit-promotion" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove-promotion" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragmentPromotion.appendChild($tr);
  });
  $tablePromotion.innerHTML = CodeTh();
  $tablePromotion.appendChild($fragmentPromotion);
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-submit")) {
    e.preventDefault();
    /* const formData = new FormData($formResource); */
    const activity = {
      promotionTitle: $formPromotion["promotionTitle"].value,
      promotionPrice: $formPromotion["promotionPrice"].value,
      promotionOffer: $formPromotion["promotionOffer"].value,
      promotionDateStart: $formPromotion["promotionDateStart"].value,
      promotionDateEnd: $formPromotion["promotionDateEnd"].value,
      promotioCategory: $formPromotion["promotionCategory"].value,
      promotioDescription: editor.getContents(),
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
        promotionp();

        document.querySelector(".crud-form-promotion").reset();
        load();
        alertManager("success", "Created Successfully");
      });
  }
});

function deleteTime() {}

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove-promotion")) {
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
            promotionp();
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
  if (e.target.matches(".edit-promotion")) {
    $titlePromotion.textContent = "Modify Offer";
    $tbnPromotion.value = "Save Changes";
    $tbnPromotion.classList.toggle("edit-two");
    $tbnPromotion.classList.toggle("btn-submit");

    let id = e.target.dataset.id,
      promo = {};
    promotion.filter((prom) => {
      if (prom.id == id) {
        promo = prom;
      }
    });

    $formPromotion.idi.value = id;
    $formPromotion.promotionTitle.value = promo.promotionTitle;
    $formPromotion.promotionPrice.value = promo.promotionPrice;
    $formPromotion.promotionOffer.value = promo.promotionOffer;
    $formPromotion.promotionDateStart.value = promo.promotionDateStart;
    $formPromotion.promotionDateEnd.value = promo.promotionDateEnd;
    $formPromotion.promotionCategory.value = promo.promotioCategory;
    editor.setContents(`${promo.promotioDescription}`);
    load();
    console.log($formPromotion.promotionDateStart.value);
    console.log($formPromotion.promotionDateEnd.value);
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    const activity = {
      id: $formPromotion.idi.value,
      promotionTitle: $formPromotion.promotionTitle.value,
      promotionPrice: $formPromotion.promotionPrice.value,
      promotionOffer: $formPromotion.promotionOffer.value,
      promotionDateStart: $formPromotion.promotionDateStart.value,
      promotionDateEnd: $formPromotion.promotionDateEnd.value,
      promotioCategory: $formPromotion.promotionCategory.value,
      promotioDescription: editor.getContents(),
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
        promotionp();
        load();
        alertManager("update", "Edit Successfully");
        $tbnPromotion.classList.toggle("edit-two");
        $tbnPromotion.classList.toggle("btn-submit");
        $tbnPromotion.value = "Add new offer";
        $titlePromotion.textContent = "Create new offer";
        $formPromotion.reset();

        /*   document.querySelector(".crud-form-resource").reset(); */
      });
  }
});

/*-----------------------------------------------------Btn Read show------------------------------------------- */

d.addEventListener("click", (e) => {
  if (e.target.matches(".read-promotion")) {
    d.querySelector("#modal-container-promotion").style.opacity = "1";
    d.querySelector("#modal-container-promotion").style.visibility = "visible";
    d.querySelector(".modal-promotion").classList.toggle("modal-clp");
    let id = e.target.dataset.ids,
      promo = {};
    promotion.filter((prom) => {
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
  if (e.target.matches(".poi")) {
    d.querySelector(".modal-promotion").classList.toggle("modal-clp");
    setTimeout(() => {
      d.querySelector("#modal-container-promotion").style.opacity = "0";
      d.querySelector("#modal-container-promotion").style.visibility = "hidden";
    }, 700);
    /* d.querySelector(".modal-resource").classList.toggle("close-resource"); */
  }
});

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

const editor = SUNEDITOR.create(document.querySelector(".txtarea-promotion"), {
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
    ["table", "link", "image", "video", "audio"], // You must add the 'katex' library at options to use the 'math' plugin.
    ["imageGallery"],
    ["fullScreen", "showBlocks", "codeView"],
    ["preview", "print"],
    ["save", "template"],
    ["codeView"],
    ["dir", "dir_ltr", "dir_rtl"],
  ],
  height: 380,

  lang: SUNEDITOR_LANG["en"],
});

const vc = d.querySelector(".cont-table-promotion_blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});
