import {
  /*   ModalShowResources, */
  openFormResources,
  resourcep,
} from "./resource.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  resourcep();
});
/* editor(); */
openFormResources(
  ".btn-resource",
  ".cancel-form",
  ".cont-new-resource",
  ".cont-tables-resource"
);
/* ModalShowResources(
  ".read-resource",
  ".close-resource",
  "#modal-container-resource",
  ".modal-resource"
); */
