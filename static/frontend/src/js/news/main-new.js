
/* import { getHomePageData } from "../homepage/homepage.js"; */
import {
  getNewsData,
  /*   ModalRemoveCourses, */
  openFormNews,
  addNews,
  closeWindowModal,
  editNews,
  ShowNews,
} from "./news.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getNewsData();
});


ShowNews(
  ".fa-dot-circle",
  ".close-news",
  "#modal-container-news",
  ".modal-news"
);
/* ModalRemoveCourses(".remove", ".close-dc", "#modal-container-dc", ".modal-dc"); */
openFormNews(".btn-news", ".cancel-news");
addNews();
closeWindowModal(".poi", "#modal-container-news", ".modal-news", "modal-cl");
editNews();

