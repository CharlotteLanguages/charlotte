import { ModalShowSponsor, openFormSponsor, sponsorp } from "./sponsor.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  sponsorp();
});
/* editor(); */

openFormSponsor(
  ".btn-sponsor",
  ".cancel-sponsor",
  ".cont-new-sponsor",
  ".cont-tables-sponsor"
);

ModalShowSponsor(
  ".fa-dot-circle",
  ".close-sponsor",
  "#modal-container-sponsor",
  ".modal-sponsor"
);
