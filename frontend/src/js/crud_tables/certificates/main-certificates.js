import {
  ModalShowCertificate,
  openFormCertificate,
  getCertificateData,
} from "./certificates.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getCertificateData();
});
/* editor(); */

openFormCertificate(
  ".btn-certificate",
  ".cancel-certificate",
  ".cont-new-certificate",
  ".cont-tables-certificate"
);

ModalShowCertificate(
  ".fa-dot-circle",
  ".close-certificate",
  "#modal-container-certificate",
  ".modal-certificate"
);
