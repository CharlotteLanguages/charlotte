import {
  calendar,
  openFormClasses,
  getClassesData,
} from "./classes.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getClassesData();
});



openFormClasses(
  ".btn-classes",
  ".cancel-classes",
  ".cont-new-classes",
  ".cont-tables-classes"
);
calendar();
