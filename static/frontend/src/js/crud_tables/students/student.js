
export function headTable() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Student</th>
    <th>Email</th>
    <th>Membership</th>
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
  <td data-label = "ID">${ele.idPerson}</td>
  <td data-label = "Student">${ele.name} ${ele.lastName}</td>
  <td data-label = "Email">${ele.email}</td>
  <td data-label = "Membership">${ele.idMembership_fk}</td>
  <td data-label = "Actions">
      <div class="icons-student">
      <i class="fas fa-dot-circle read-student" data-ids = ${ele.idPerson} ></i>
      <i class="fas fa-pen edit-student" data-id = ${ele.idPerson}></i> 
      <i class="fas fa-times-circle remove-student" data-idr =${ele.idPerson}></i>
      </div>
  </td>
  </tr>
  </tbody>`;

 
   return code;
 }