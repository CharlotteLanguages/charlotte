import {
  memberp,
  ModalRemoveMember,
  ModalShowMember,
  openFormMember,
} from "./membership.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  memberp();
});

openFormMember(
  ".btn-member",
  ".cancel-form",
  ".cont-new-member",
  ".cont-tables-member"
);

ModalShowMember(
  ".fa-dot-circle",
  ".close-member",
  "#modal-container-member",
  ".modal-member"
);

ModalRemoveMember(".remove", ".close-d", "#modal-container-d", ".modal-d");
