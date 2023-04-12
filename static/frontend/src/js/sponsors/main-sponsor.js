import {openFormSponsor, getSponsorData } from "./sponsor.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getSponsorData();
});
/* editor(); */

openFormSponsor(
  ".btn-sponsor",
  ".cancel-sponsor",
  ".cont-new-sponsor",
  ".cont-tables-sponsor"
);

