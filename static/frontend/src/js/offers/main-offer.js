import {
  ModalRemovePromotions,
  ModalShowPromotions,
  openFormPromotions,
  promotionp,
} from "./offers.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  promotionp();
});

ModalShowPromotions(
  ".fa-dot-circle",
  ".close-promotion",
  "#modal-container-promotion",
  ".modal-promotion"
);
ModalRemovePromotions(".remove", ".close-d", "#modal-container-d", ".modal-d");
openFormPromotions(
  ".btn-promotion",
  ".cancel-form",
  ".cont-new-promotion",
  ".cont-tables-promotion"
);
