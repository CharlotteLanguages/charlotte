import {
  activitiesp,
  ModalRemoveActivities,
  ModalShowActivities,
  openFormActivities,
} from "./activities.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  activitiesp();
});
ModalShowActivities(".fa-dot-circle", ".close", "#modal-container", ".modal");
ModalRemoveActivities(
  ".remove",
  ".close-de",
  "#modal-container-de",
  ".modal-de"
);

openFormActivities(
  ".btn__activities",
  ".cancel-form",
  ".cont-new-review",
  ".container__tables",
  "#container-noti"
);
