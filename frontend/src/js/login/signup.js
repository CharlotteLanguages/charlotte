const d = document,
  API_URL = `http://localhost:3000/signup`,
  form = document.querySelector(".form"),
  inputs = document.querySelectorAll(".form__input");

const fields = {
  firstName: false,
  lastName: false,
  password: false,
  email: false,
  userName: false,
};

const expressions = {
  firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  userName: /^[a-zA-Z0-9\_\-\.]{4,16}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password:
    /(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040"])(?=.*[A-Z])(?=.*[a-z])\S{6,16}$/,
};

const hasUser = async () => {
  try {
    const res = await fetch(API_URL),
      data = await res.json();
    generateUserName(data);
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
  } catch (err) {
    const message = err.statusText || "An error occurred";
    /* let table;
      table.insertAdjacentHTML("afterend", `<p></p> ${err.status}: ${err:message}`);  */
  }
};

const emailUser = async () => {
  try {
    const res = await fetch(API_URL),
      data = await res.json();
    repeatedEmailMessage(data);
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
  } catch (err) {
    const message = err.statusText || "An error occurred";
    /* let table;
      table.insertAdjacentHTML("afterend", `<p></p> ${err.status}: ${err:message}`);  */
  }
};

function generateUserName(data) {
  if (data.length < 1) {
    form.userName.value = `${form.firstName.value
      .slice(0, 4)
      .toLowerCase()}.${form.lastName.value
      .slice(0, 4)
      .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
    return;
  }
  data.map((ele) => {
    if (ele.userName == form.userName.value.toLowerCase()) {
      if (form.firstName.value.length <= 2 && form.lastName.value.length <= 3) {
        form.userName.value = `${form.firstName.value
          .slice(0, 1)
          .toLowerCase()}.${form.lastName.value
          .slice(0, 2)
          .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
        return;
      }
      if (form.userName.value.length == 9) {
        form.userName.value = `${form.firstName.value
          .slice(0, 2)
          .toLowerCase()}.${form.lastName.value
          .slice(0, 2)
          .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
        return;
      }
      if (form.userName.value.length == 8) {
        form.userName.value = `${form.firstName.value
          .slice(0, 1)
          .toLowerCase()}.${form.lastName.value
          .slice(0, 3)
          .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
        return;
      }
      if (form.userName.value.length == 10) {
        form.userName.value = `${form.firstName.value
          .slice(0, 2)
          .toLowerCase()}.${form.lastName.value
          .slice(0, 3)
          .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
        return;
      }

      form.userName.value = `${form.firstName.value
        .slice(0, 3)
        .toLowerCase()}.${form.lastName.value
        .slice(0, 3)
        .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
    } else {
      form.userName.value = `${form.firstName.value
        .slice(0, 4)
        .toLowerCase()}.${form.lastName.value
        .slice(0, 4)
        .toLowerCase()}.${form.dateBirth.value.slice(8, 10)}`;
    }
  });
}

const validateFields = (expression, input, camp) => {
  if (expression.test(input.value)) {
    d.querySelector(`#group__${camp} .form__input-error`).classList.remove(
      "form__input-error-active"
    );
    fields[camp] = true;
  } else {
    d.querySelector(`#group__${camp} .form__input-error`).classList.add(
      "form__input-error-active"
    );
    fields[camp] = false;
  }
};

const validateForm = (e) => {
  switch (e.target.name) {
    case "firstName":
      validateFields(expressions.firstName, e.target, e.target.name);
      hasUser();
      break;
    case "lastName":
      validateFields(expressions.lastName, e.target, e.target.name);
      hasUser();
      break;
    case "email":
      validateFields(expressions.email, e.target, e.target.name);
      emailUser();
      break;
    case "userName":
      validateFields(expressions.userName, e.target, e.target.name);
      break;
    case "password":
      validateFields(expressions.password, e.target, e.target.name);
      break;
    case "dateBirth":
      hasUser();
      break;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validateForm);
});

d.addEventListener("click", (e) => {
  if (e.target.matches("#date-birth")) {
    e.target.setAttribute("type", "date");
  }
  if (e.target.matches(".form__container")) {
    d.querySelector("#date-birth").setAttribute("type", "text");
  }
});

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
      form.email.value.length > 1
    ) {
      try {
        const dataUser = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            dateBirth: e.target.dateBirth.value,
            gender: e.target.gender.value,
            userName: e.target.userName.value,
            password: e.target.password.value,
          },
          res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(dataUser),
            headers: { "content-Type": "application/json" },
          }),
          json = await res.json();
        resetForm(e);
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
      } catch (error) {
        /*    let message = err.statusText || "ocurrió un Error";
          $formActivity.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}:${message}</p></b>`
          ); */
      }
    } else {
      addMesaggeIncorrect();
    }
  });
}
registerUser();

function resetForm(e) {
  e.target.reset();
  addMesaggeCorrect();
  d.querySelector("#date-birth").setAttribute("type", "text");
  d.querySelector(".gender2").classList.add("notGender");
  d.querySelector(".gender").classList.remove("notGender");
  d.querySelector(".icon-pass").classList.add("fa-eye-slash");
  d.querySelector(".icon-pass").classList.remove("fa-eye");
}

function addMesaggeCorrect() {
  d.querySelector(".form__message-exit").style.display = "inline";
  setTimeout(() => {
    d.querySelector(".form__message-exit").style.display = "none";
  }, 2500);
}
function addMesaggeIncorrect() {
  d.querySelector(".form__message-error").style.display = "inline";
  setTimeout(() => {
    d.querySelector(".form__message-error").style.display = "none";
  }, 3000);
}

function repeatedEmailMessage(data) {
  let uno = d.querySelector(".email__already");
  data.forEach((ele) => {
    if (ele.email == form.email.value) {
      uno.classList.add("form__input-error-activ");
      setTimeout(() => {
        uno.classList.remove("form__input-error-activ");
      }, 2500);
      fields["email"] = false;
    }
  });
}

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
