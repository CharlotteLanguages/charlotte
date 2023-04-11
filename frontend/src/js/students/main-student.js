import { openFormStudent, getStudentData } from "./student.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getStudentData();
});
/* editor(); */
openFormStudent(
  ".btn-student",
  ".cancel-student",
  ".cont-new-student",
  ".cont-tables-student"
);
