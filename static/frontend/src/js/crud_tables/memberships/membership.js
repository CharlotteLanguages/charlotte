
export function headTable() {
  let code = `
  <thead class ="head">
  <tr class = "th">
  <th>ID</th>
  <th>Membership</th>
  <th>Category</th>
  <th>Price</th>
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
  <td data-label = "ID">${ele.idMembership}</td>
  <td data-label = "Name">${ele.afiliacion}</td>
  <td data-label = "Category">${ele.categoria}</td>
  <td data-label = "Membership">${ele.precio}</td>
  <td data-label = "Actions">
      <div class="icons-member">
      <i class="fas fa-dot-circle read-member" data-ids = ${ele.idMembership}></i>
      <i class="fas fa-pen edit-member" data-id = ${ele.idMembership}></i> 
      <i class="fas fa-times-circle remove-member" data-idr =${ele.idMembership}></i>
      </div>
  </td>
  </tr>
  </tbody>
  `;

   return code;
 }