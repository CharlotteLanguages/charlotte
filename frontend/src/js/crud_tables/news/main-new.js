
/* import { getHomePageData } from "../homepage/homepage.js"; */
import {
  getNewsData,
  /*   ModalRemoveCourses, */
  openFormNews,
  closeWindowModal,
/* 
  ShowNews, */
} from "./news.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getNewsData();
});


openFormNews(".btn-news", ".cancel-news");

closeWindowModal(".poi", "#modal-container-news", ".modal-news", "modal-cl");


