import {
  getMembershipData,
  openFormMember,
} from "./membership.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getMembershipData();
});

openFormMember(
  ".btn-member",
  ".cancel-member",
  ".cont-new-member",
  ".cont-tables-member"
);
