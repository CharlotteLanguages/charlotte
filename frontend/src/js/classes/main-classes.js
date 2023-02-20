import {
  calendar,
  ModalRemoveClasses,
  ModalShowClasses,
  openFormClasses,
  Classes,
} from "./classes.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  Classes();
});

ModalShowClasses(
  ".fa-dot-circle",
  ".close-classes",
  "#modal-container-classes",
  ".modal-classes"
);
ModalRemoveClasses(".remove", ".close-d", "#modal-container-d", ".modal-d");
openFormClasses(
  ".btn-classes",
  ".cancel-form",
  ".cont-new-classes",
  ".cont-tables-classes"
);
calendar();
