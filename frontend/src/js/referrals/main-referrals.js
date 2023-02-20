import { ModalShowReferral, openFormReferral, referralp } from "./referrals.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  referralp();
});
/* editor(); */

openFormReferral(
  ".btn-referral",
  ".cancel-referral",
  ".cont-new-referral",
  ".cont-tables-referral"
);

ModalShowReferral(
  ".fa-dot-circle",
  ".close-referral",
  "#modal-container-referral",
  ".modal-referral"
);
