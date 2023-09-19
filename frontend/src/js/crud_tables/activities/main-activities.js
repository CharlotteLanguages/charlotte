import {
  getActivitiesData,
  openFormActivities,
  getStudentData
 
 /*  printCourses */
} from "./activities.js";

const d = document;


openFormActivities(
  ".btn-activities",
  ".cancel-activitie",
  ".cont-new-activitie",
  ".cont-tables-activities",
  "#container-noti"
);








d.addEventListener("DOMContentLoaded", (e) => {
  getActivitiesData();
/*   printCourses(); */
getStudentData();
});
