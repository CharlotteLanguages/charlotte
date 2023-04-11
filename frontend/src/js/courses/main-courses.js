import {
  getCourseData,

  openFormCourses,

  closeWindowModal,

} from "./courses.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getCourseData();
});

/* ModalRemoveCourses(".remove", ".close-dc", "#modal-container-dc", ".modal-dc"); */
openFormCourses(".btn-courses", ".cancel-course");

closeWindowModal(
  ".poi",
  "#modal-container-course",
  ".modal-course",
  "modal-cl"
);

