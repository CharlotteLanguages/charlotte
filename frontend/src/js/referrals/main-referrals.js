import { openFormReferral, getReferralData } from "./referrals.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getReferralData();
});
/* editor(); */

openFormReferral(
  ".btn-referral",
  ".cancel-referral",
  ".cont-new-referral",
  ".cont-tables-referral"
);

