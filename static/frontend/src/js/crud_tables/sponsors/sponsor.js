
export function headTable() {
    let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Sponsors</th>
    <th>Address</th>
    <th>Website</th>
    <th>Actions</th>
    </tr>
    </thead>
      `;
    return code;
  }
  
  
  
  
  
  export function bodyTable(ele){
    let code = `
    <tbody class = "body">
    <tr class = "tr">
    <td  data-label = "ID">${ele.idPatrocinador}</td>
    <td  data-label = "Sponsors">${ele.nombre}</td>
    <td  data-label = "Address">${ele.direccion}</td>
    <td  data-label = "Website">${ele.webSite}</td>
    <td  data-label = "Actions">
        <div class="icons-sponsor">
        <i class="fas fa-dot-circle read-sponsor" data-ids = ${ele.idPatrocinador} ></i>
        <i class="fas fa-pen edit-sponsor" data-id = ${ele.idPatrocinador}></i> 
        <i class="fas fa-times-circle remove-sponsor" data-idr =${ele.idPatrocinador}></i>
        </div>
    </td>
    </tr>
    </tbody>
  `;
  
   
     return code;
   }

   /*-------------------------------------------------------------------- */

const vc = document.querySelector(".cont-table-sponsor_blue"),
vd = document.querySelector(".cont-tables-sponsor");

window.sr = ScrollReveal();
sr.reveal(vc, {
duration: 2500,
origin: "bottom",
distance: "-5px",
});