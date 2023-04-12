import { openFormSponsor, getReviewData } from "./review.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getReviewData();
});
/* editor(); */

openFormSponsor(
  ".btn-review",
  ".cancel-review",
  ".cont-new-review",
  ".cont-tables-review"
);

