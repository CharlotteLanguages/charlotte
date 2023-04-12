import {
  activitiesp,
  openFormActivities,
} from "./activities.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  activitiesp();
});


openFormActivities(
  ".btn-activities",
  ".cancel-activitie",
  ".cont-new-activitie",
  ".cont-tables-activities",
  "#container-noti"
);
