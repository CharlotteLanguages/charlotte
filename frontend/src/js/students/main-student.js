import { ModalShowStudent, openFormStudent, studentp } from "./student.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  studentp();
});
/* editor(); */
openFormStudent(
  ".btn-student",
  ".cancel-student",
  ".cont-new-student",
  ".cont-tables-student"
);

ModalShowStudent(
  ".fa-dot-circle",
  ".close-student",
  "#modal-container-student",
  ".modal-student"
);
