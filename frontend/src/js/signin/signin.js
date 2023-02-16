const d = document,
  API_URL = "http://localhost:3000/signup";
const form = d.querySelector(".form");

d.addEventListener("click", (e) => {
  if (e.target.matches(".buttom-signup")) {
    window.location = "/src/views/signup.html";
  }
  if (e.target.matches(".forgot")) {
    /* d.querySelector(".container-forgot-password").style.display = "inline";
    d.querySelector(".form").style.display = "none"; */
    d.querySelector(".form").classList.toggle("change-forgot-password");
    d.querySelector(".buttom-signup").classList.toggle(
      "change-forgot-password"
    );
    d.querySelector(".container-forgot-password").classList.toggle(
      "change-forgot-password"
    );
  }
  if (e.target.matches(".cancel-left")) {
    d.querySelector(".form").classList.toggle("change-forgot-password");
    d.querySelector(".container-forgot-password").classList.toggle(
      "change-forgot-password"
    );
    d.querySelector(".buttom-signup").classList.toggle(
      "change-forgot-password"
    );
  }
  if (e.target.matches(".cancel-back")) {
    d.querySelector(".form").classList.toggle("change-forgot-password");
    d.querySelector(".container-forgot-password").classList.toggle(
      "change-forgot-password"
    );
    d.querySelector(".buttom-signup").classList.toggle(
      "change-forgot-password"
    );
  }
});

const signup = async () => {
  const d = document;
  try {
    const res = await fetch(API_URL),
      data = await res.json();
    let cont = 0;
    data.map((ele) => {
      if (ele.userName == form.userName.value) {
        console.log("existe");
      } else if (!ele.userName) {
        console.log("no existe");
      } else {
        console.log("no existe");
      }
    });

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
  } catch (err) {
    /*     const message = err.statusText || "An error occurred";
    let table;
      table.insertAdjacentHTML("afterend", `<p></p> ${err.status}: ${err:message}`);  */
  }
};

d.addEventListener("DOMContentLoaded", (e) => {});

d.addEventListener("submit", async (e) => {
  if (e.target.matches(".form")) {
    e.preventDefault();
    signup();

    try {
    } catch (error) {
      let message = err.statusText || "ocurrió un Error";
      /*   $formActivity.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}:${message}</p></b>`
          ); */
    }
  }
});
