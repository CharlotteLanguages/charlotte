import {

  openFormResources,
  getResourceData,
} from "./resource.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getResourceData();
});
/* editor(); */
openFormResources(
  ".btn-resource",
  ".cancel-resource",
  ".cont-new-resource",
  ".cont-tables-resource"
);

