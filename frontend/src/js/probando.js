
const d = document,
API_URL = `http://localhost:3000/student`;

/* let student = ["colombia","venezuela", "Brasil"] */

let student = [];
 const getStudentData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();

   
      student = json;
 


      /*  renderStudentData(student); */
      
    } catch (err) {
        /*  const table = d.querySelector(".crud-table-student");
        table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`; */
    }
};
console.log(student)


d.addEventListener("DOMContentLoaded", (e) => {
    getStudentData();
  });

const wrapper = d.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");

function ddg(student){
    return student
}

addStudent();

function addStudent(selectedStudent){
  options.innerHTML = '';
  student.forEach(student =>{
    let isSelected = student == selectedStudent? 'selected': '';
    let li = `<li onclick = "updateName(this)" class="${isSelected}">${student.studentName} ${student.lastNameStudent}</li>`;
    options.insertAdjacentHTML("beforeend", li)
  })
}



function updateName(selectedLi){
  searchInp.value = "";
  addStudent(selectedLi.innerHTML);
  wrapper.classList.remove("active");
  selectBtn.firstElementChild.innerText = selectedLi.innerText;

}

searchInp.addEventListener("keyup", ()=>{
  let arr = [];
  let searchWord = searchInp.value.toLowerCase();
  arr = student.filter(data=>{
    return data.studentName.toLowerCase().startsWith(searchWord) || data.lastNameStudent.toLowerCase().startsWith(searchWord) ;
  }).map(data=>{
    let isSelected = data == selectBtn.firstElementChild.innerText? "selected": "";
    return `<li onclick="updateName(this)" class="${isSelected}">${data.studentName} ${data.lastNameStudent}</li>`
  }).join("")
  options.innerHTML = arr ? arr: `<p style ="margin-top:10px">Oops! Student not found</p>`
})

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
