import {
  getCourseData,
  /*   ModalRemoveCourses, */
  ShowCourses,
  openFormCourses,
  addCourse,
  closeWindowModal,
  editCourse,
} from "./courses.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getCourseData();
});

ShowCourses(
  ".fa-dot-circle",
  ".close-course",
  "#modal-container-course",
  ".modal-course"
);
/* ModalRemoveCourses(".remove", ".close-dc", "#modal-container-dc", ".modal-dc"); */
openFormCourses(".btn-courses", ".cancel-form");
addCourse();
closeWindowModal(
  ".poi",
  "#modal-container-course",
  ".modal-course",
  "modal-cl"
);
editCourse();
