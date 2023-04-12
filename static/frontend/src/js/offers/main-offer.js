import {
  ModalShowPromotions,
  openFormPromotions,
  getOfferData,
} from "./offers.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getOfferData();
});

ModalShowPromotions(
  ".fa-dot-circle",
  ".close-promotion",
  "#modal-container-promotion",
  ".modal-promotion"
);

openFormPromotions(
  ".btn-promotion",
  ".cancel-offer",
  ".cont-new-promotion",
  ".cont-tables-promotion"
);
