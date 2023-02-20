import { ModalShowSponsor, openFormSponsor, sponsorp } from "./review.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  sponsorp();
});
/* editor(); */

openFormSponsor(
  ".btn-review",
  ".cancel-review",
  ".cont-new-review",
  ".cont-tables-review"
);

ModalShowSponsor(
  ".fa-dot-circle",
  ".close-review",
  "#modal-container-review",
  ".modal-review"
);
