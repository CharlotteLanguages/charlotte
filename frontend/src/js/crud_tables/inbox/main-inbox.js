import {
  getInboxData,
  getInboxDataa,
  /*   ModalRemoveCourses, */
  ShowInbox,
  openFormInbox,
  addCourse,
  closeWindowModal,
} from "./inbox.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getInboxData();
  getInboxDataa();
});

ShowInbox(
  ".fa-dot-circle",
  ".close-inbox",
  "#modal-container-inbox",
  ".modal-inbox"
);
/* ModalRemoveCourses(".remove", ".close-dc", "#modal-container-dc", ".modal-dc"); */
openFormInbox(".btn-inbox", ".cancel-form");
addCourse();
closeWindowModal(".poi", "#modal-container-inbox", ".modal-inbox", "modal-cl");
