const d = document,
  API_URL = `https://apicharlotte.up.railway.app/register`,
/*   API_URL = `http://localhost:3000/signup`, */
  form = document.querySelector(".form"),
  inputs = document.querySelectorAll(".form__input");
  console.log(inputs)

/*   
  d.addEventListener("DOMContentLoaded", (e) => {
    d.querySelector(".form").style.display = "none";
   setTimeout(() => {
     
    d.querySelector(".form").style.display = "block";
   }, 1000);
    
  }); */




/*------------------------------------------------------------------------------------------------------ */

const fields = {
  firstName: false,
  lastName: false,
  password: false,
  email: false,
  userName: false,
};

/*----------------------------------------------------------------------------------------------------------------------------- */


const Regularexpressions = {
  firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  userName: /^[a-zA-Z0-9\_\-\.]{4,16}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password:/(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040"])(?=.*[A-Z])(?=.*[a-z])\S{6,16}$/
};


/*-------------------------------------------------------------------------------------------------------------- */



const hasUser = async () => {
  try {
    const res = await fetch(API_URL),
      data = await res.json();
    generateUserName(data);
  } catch (err) {
    const message = err.statusText || "An error occurred";
  }
};


/*--------------------------------------------------------------------------------------------------------------- */


const emailUser = async () => {
  try {
    const res = await fetch(API_URL),
      data = await res.json();
    repeatedEmailMessage(data);
  } catch (err) {
    
  }
};


function setMinimumYear() {
  let currentDate = new Date(),
    currentYear = currentDate.getFullYear()-10;
  d.querySelector("#date-birth").setAttribute("max",`${currentYear}-12-31`);
}





/*----------------------------------------------------------------------------------------------------------------------- */


function generateUserName(data) {
  if (data.length < 1) {
    form.userName.value = `${form.firstName.value
      .slice(0, 4)
      .toLowerCase()}.${form.lastName.value
      .slice(0, 4)
      .toLowerCase()}.${form.dateBirth.value
        .slice(8, 10)}`;
    return;
  }
  data.map((ele) => {
    if (ele.userName == form.userName.value.toLowerCase()) {
      let userName = ele.userName.split(".");
      for (var i=0; i < userName.length; i++) {
    
        if (userName[0].length == 4 && userName[1].length == 4) {
          form.userName.value = `${form.firstName.value
            .slice(0, 4)
            .toLowerCase()}.${form.lastName.value
            .slice(0, 3)
            .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
          return;
        }
        if (userName[0].length == 4 &&  userName[1].length == 3) {
          form.userName.value = `${form.firstName.value
            .slice(0, 4)
            .toLowerCase()}.${form.lastName.value
            .slice(0, 2)
            .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
          return;
        }
        if (userName[0].length == 4 &&  userName[1].length == 2) {
          form.userName.value = `${form.firstName.value
            .slice(0, 3)
            .toLowerCase()}.${form.lastName.value
            .slice(0, 4)
            .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
          return;
        }
        if (userName[0].length == 3 &&  userName[1].length == 4) {
          form.userName.value = `${form.firstName.value
            .slice(0, 3)
            .toLowerCase()}.${form.lastName.value
            .slice(0, 3)
            .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
          return;
        }
        if (userName[0].length == 3 &&  userName[1].length == 3) {
          form.userName.value = `${form.firstName.value
            .slice(0, 3)
            .toLowerCase()}.${form.lastName.value
            .slice(0, 2)
            .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
          return;
        }
        if (userName[0].length == 3 &&  userName[1].length == 2) {
          form.userName.value = `${form.firstName.value
            .slice(0, 2)
            .toLowerCase()}.${form.lastName.value
            .slice(0, 4)
            .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
          return;
        }
        if (userName[0].length == 2 &&  userName[1].length == 4) {
          form.userName.value = `${form.firstName.value
            .slice(0, 2)
            .toLowerCase()}.${form.lastName.value
            .slice(0, 3)
            .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
          return;
        }
        if (userName[0].length == 2 &&  userName[1].length == 3) {
          form.userName.value = `${form.firstName.value
            .slice(0, 2)
            .toLowerCase()}.${form.lastName.value
            .slice(0, 2)
            .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
          return;
        }
        if (userName[0].length == 2 &&  userName[1].length == 2) {
          form.userName.value = `${form.firstName.value
            .slice(0, 1)
            .toLowerCase()}.${form.lastName.value
            .slice(0, 4)
            .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
          return;
        }
        if (userName[0].length == 1 &&  userName[1].length == 4) {
          form.userName.value = `${form.firstName.value
            .slice(0, 1)
            .toLowerCase()}.${form.lastName.value
            .slice(0, 3)
            .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
          return;
        }
        if (userName[0].length == 1 &&  userName[1].length == 3) {
          form.userName.value = `${form.firstName.value
            .slice(0, 1)
            .toLowerCase()}.${form.lastName.value
            .slice(0, 2)
            .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
          return;
        }
     }     
    } else {
      form.userName.value = `${form.firstName.value
        .slice(0, 4)
        .toLowerCase()}.${form.lastName.value
        .slice(0, 4)
        .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
    }
  });
}


/*---------------------------------------------------------------------------------------------------------------- */


const validateFields = (expression, input, camp) => {
  if (expression.test(input.value)) {

    d.querySelector(`#group__${camp} .form__input-error`).classList.remove("form__input-error-active");
    fields[camp] = true;
  } else {

    d.querySelector(`#group__${camp} .form__input-error`).classList.add("form__input-error-active");
    fields[camp] = false;
  }
};


/*---------------------------------------------------------------------------------------------------------------------------- */


const validateForm = (e) => {
  switch (e.target.name) {
    case "firstName":
      validateFields(Regularexpressions.firstName, e.target, e.target.name);
      hasUser();
       getData();

      break;

    case "lastName":
      validateFields(Regularexpressions.lastName, e.target, e.target.name);
      hasUser();
      getData();
      break;

      case "email":
        validateFields(Regularexpressions.email, e.target, e.target.name);
        emailUser();
        break;

        case "userName":
      validateFields(Regularexpressions.userName, e.target, e.target.name);
      break;

    case "password":
      validateFields(Regularexpressions.password, e.target, e.target.name);
      break;

  }
};
const validateDateBirth = (e) => {
  switch (e.target.name) {
    case "dateBirth":
      hasUser();
      getData();
      break;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validateForm);
  input.addEventListener("change", validateDateBirth);
});






d.addEventListener("click", (e) => {
  if (e.target.matches("#date-birth")) {
    e.target.setAttribute("type", "date");
  }
  if (e.target.matches(".form__container")) {
    d.querySelector("#date-birth").setAttribute("type", "text");
  }
});


/*---------------------------------------------------------------------------------------------------------------- */

function registerUser() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (
      fields.firstName &&
      form.firstName.value.length > 1 &&
      fields.lastName &&
      form.lastName.value.length > 1 &&
      fields.password &&
      form.password.value.length > 1 &&
      fields.email &&
      form.email.value.length > 1 &
      fields.userName &&
      form.email.value.length > 1
    ) {
      try {
        const dataUser = {
            name: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            birthDate: e.target.dateBirth.value,
            gender: e.target.gender.value,
            userName: e.target.userName.value,
            password: e.target.password.value,
          },
          /* res = await fetch("http://localhost:4000/api/auth/signup", */
          res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(dataUser),
            headers: { "content-Type": "application/json" },
          }),
          json = await res.json();
          console.log(json);
      
         /*  window.location.href = "/src/views/login/login.html"  */
         addMesaggeCorrect();
        resetForm(e);
   
      } catch (error) {

      }
    } else {
      addMesaggeIncorrect();
    }
  });
}


registerUser();

/*-------------------------------------------------------------------------------------------------------------- */

function resetForm(e) {
  e.target.reset();
  d.querySelector("#date-birth").setAttribute("type", "text");
  d.querySelector(".gender2").classList.add("notGender");
  d.querySelector(".gender").classList.remove("notGender");
  d.querySelector(".icon-pass").classList.add("fa-eye-slash");
  d.querySelector(".icon-pass").classList.remove("fa-eye");
}


/*---------------------------------------------------------------------------------------------------------------- */



function addMesaggeCorrect() {
  d.querySelector(".form__message-exit").style.display = "inline";
  setTimeout(() => {
    d.querySelector(".form__message-exit").style.display = "none";
  }, 2000);
}


/*-------------------------------------------------------------------------------------------------- */

function addMesaggeIncorrect() {
  d.querySelector(".form__message-error").style.display = "inline";
  setTimeout(() => {
    window.location.href = "/src/views/login/login.html" 
    d.querySelector(".form__message-error").style.display = "none";
  }, 2000);
}


/*------------------------------------------------------------------------------------------------------------------------ */

function repeatedEmailMessage(data) {
 const uno = d.querySelector(".email__already")
  data.forEach((ele) => {
    if (ele.email == form.email.value) {
      uno.classList.add("form__input-error-activ");
      setTimeout(() => {
        uno.classList.remove("form__input-error-activ");
      }, 4000); 
       fields["email"] = false;
      }
  });
}

async function getData() {
  try {
    const res = await fetch(API_URL),
      data = await res.json();
      data.forEach(user=>{
        if (user.userName == form.userName.value) {
          d.querySelector(`#group__userName .form__input-error`).classList.add("form__input-error-active");
          fields.userName = false;
        } else {
        
          d.querySelector(`#group__userName .form__input-error`).classList.remove("form__input-error-active");
         fields.userName = true;
        }

      })


      
  } catch (err) {
    const message = err.statusText || "An error occurred";
  }
};


/*-------------------------------------------------------------------------------------------------------------------- */


function showPassword() {
  let input = d.querySelector("#password-signup");
  d.querySelector(".icon-pass").addEventListener("click", (e) => {
    if (input.type == "password") {
      e.target.classList.remove("fa-eye-slash");
      e.target.classList.add("fa-eye");
      input.type = "text";
    } else {
      input.type = "password";
      e.target.classList.add("fa-eye-slash");
      e.target.classList.remove("fa-eye");
    }
  });
}
showPassword();

d.querySelector(".genderone").addEventListener("click", (e) => {
  d.querySelector(".gender2").classList.remove("notGender");
  d.querySelector(".gender").classList.add("notGender");
});

d.addEventListener("DOMContentLoaded", (e) => {
 setMinimumYear();
});


/*-------------------------------------------------------------- */

window.addEventListener("load", ()=>{
  document.getElementById("loader").classList.toggle("loader2");

})