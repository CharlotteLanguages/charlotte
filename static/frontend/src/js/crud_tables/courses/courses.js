
export function headTable() {
  let code = `
  <thead class ="head">
  <tr class = "th">
  <th>ID</th>
  <th>Course title</th>
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
  <td data-label = "ID">${ele.idCurso}</td>
  <td data-label = "Course title">${ele.titulo}</td>
  <td data-label = "Category">${ele.categoria}</td>
  <td data-label = "Price">${ele.precio}</td>
  <td data-label = "Actions">
      <div class="icons-course">
      <i class="fas fa-dot-circle read-course" data-ids=${ele.idCurso}></i>
      <i class="fas fa-pen edit-course" data-id = ${ele.idCurso}></i> 
      <i class="fas fa-times-circle remove-course" data-idr =${ele.idCurso}></i>
      </div>
  </td>
  </tr>
  </tbody>
  `;

   return code;
 }