
const d = document,
API_URL = `https://apicharlotte.up.railway.app/register`;

//https://api.escuelajs.co/api/v1/products
//https://dummyjson.com/users
//https://fakestoreapi.com/products
//https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8
//https://jsonplaceholder.typicode.com/photos
//https://apicharlotte.up.railway.app/membership


/* let student = ["colombia","venezuela", "Brasil"] */
//"Authorization": localStorage.getItem() ,
let student = [];
 const getStudentData = async () => {
  try {
    let res = await fetch(API_URL),
      json = await res.json();
      student = json;
      console.log(student);
      /*  renderStudentData(student); */
       addStudent(student);

      
    } catch (err) {
        /*  const table = d.querySelector(".crud-table-student");
        table.innerHTML = `<div class = "no-activities">COULD NOT ESTABLISH CONNECTION TO SERVER</div>`; */
    }
};



d.addEventListener("DOMContentLoaded", (e) => {
    getStudentData();
  });

const wrapper = d.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");




function addStudent(selectedStudent){
  options.innerHTML = '';
  student.forEach(student =>{
    let isSelected = student == selectedStudent? 'selected': '';
    let li = `<li onclick = "updateName(this)" class="${isSelected}">${student.name} ${student.lastName}</li>`;
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
    return data.name.toLowerCase().startsWith(searchWord) || data.lastName.toLowerCase().startsWith(searchWord) ;
  }).map(data=>{
    let isSelected = data == selectBtn.firstElementChild.innerText? "selected": "";
    return `<li onclick="updateName(this)" class="${isSelected}">${data.name} ${data.lastName}</li>`
  }).join("")
  options.innerHTML = arr ? arr: `<p style ="margin-top:10px">Oops! Student not found</p>`
})

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));






/* 

d.addEventListener("submit", async (e) => {
  if (e.target === ".login_form") {
    e.preventDefault();
      ///CREATE POST
      try {
        let options = {
            method: "POST",  
            headers: { 
              "Content-type": "application/json" },
          },

        res = await fetch(`https://reqres.in/api/register`, options),
          json = await res.json();
          console.log(json);
      } catch (err) {
        let message = err.statusText || "ocurrió un Error";
          console.log("hay un error");
      }
    
  }
}); */
/* $(document).ready(function(){
	$("#login_form").on("submit",function(){
		$.ajax({
			type:"POST",
			url:"https://reqres.in/api/login",
			data:$(this).serialize(),
			success:function(response, responseText){
				console.log(response);
				let token = response.token;
				document.cookie = token;
				alert("Se inicio sesión correctamente");
				window.location.href = "pagina.html";

			},
			error: function(response,responseText){
				console.log(response.responseText);
			},
		});
		return false
	});

}); */



