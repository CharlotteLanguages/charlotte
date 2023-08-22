const d = document;

 export function headTable() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Reviews Title</th>
    <th>Mentions</th>
    <th>Type</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}


export function bodyTable(ele){
  let  code = `
   <tbody class = "body">
   <tr class = "tr">
   <td data-label = "ID">${ele.id}</td>
   <td data-label = "Reviews title">${ele.titleReview}</td>
   <td data-label = "Mention">${ele.mentionReview}</td>
   <td data-label = "Type">${ele.typeReview}</td>
   <td data-label = "Actions">
       <div class="icons-review">
       <i class="fas fa-dot-circle read-review" data-ids = ${ele.id} ></i>
       <i class="fas fa-pen edit-review" data-id = ${ele.id}></i> 
       <i class="fas fa-times-circle remove-review" data-idr =${ele.id}></i>
       </div>
   </td>
   </tr>
   </tbody>`;
 
   return code;
 }

export function commetss(comment){

  let code = `
  <div class="comments">
  <p class="name">Alberto</p>
  <p class="type">Facebook</p>
  <p class="ago">3 hours ago..</p>
      <div class="comment">${comment.editorReview}</div>
      <button class="btn-share">share in Charlotte</button>
      <div class = "btn-del"><i class="fas fa-trash-alt"></i></div> 
      <p class= "textRemo">Remove</p>
      <div class = "userComment"><i class="fas fa-user-circle"></i></div>
      </div>
  `;

   return code;
 }

/*------------------------------------------------------------------------------------------------ */






d.addEventListener("click", (e) => {
  if (e.target.matches(".fa-bell")) {
    d.querySelector(".tooltip").classList.toggle("show_tooltip");
  }
  if (e.target.matches(".nav__icon") || e.target.matches("#container")) {
    d.querySelector(".tooltip").classList.remove("show_tooltip");
  }

  if (e.target.matches(".notifications")) {
    d.querySelector(".tooltip_message").classList.toggle("show_notifications");
    d.querySelector(".tooltip").classList.remove("show_tooltip");
    d.querySelector(".open_tooltip").classList.add("fa-chevron-down");
    d.querySelector(".open_tooltip").classList.remove("fa-chevron-up");
  }
});


d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-published")) {
    //agregar color blanco a este
    e.target.classList.add("add_color-white");
    //agrega color azul al contrario
    d.querySelector(".btn-inList").classList.add("add_color-blue");
    //elimina color blanco al contrario
    d.querySelector(".btn-inList").classList.remove("add_color-white");
    //agregar tabla principal
    d.querySelector(".comm").classList.add("up-comments");
    //remover tabla de comentarios
    d.querySelector(".cont-tables-review").classList.remove("up-table-review");
    news.classList.remove("noticia");
  }

  if (e.target.matches(".btn-inList")) {
    //agregar color blanco a este
    e.target.classList.add("add_color-white");
    //agregar color azul al contrario
    d.querySelector(".btn-published").classList.add("add_color-blue");
    //quitar el blanco contrario
    d.querySelector(".btn-published").classList.remove("add_color-white");
    //remover tabla principal
    d.querySelector(".comm").classList.remove("up-comments");
    //agregar tabla de comentarios
    d.querySelector(".cont-tables-review").classList.add("up-table-review");
    news.classList.add("noticia");
  }
});

const vc = d.querySelector(".cont-table-review_blue");

window.sr = ScrollReveal();
sr.reveal(vc, {
  duration: 2500,
  origin: "bottom",
  distance: "-5px",
});