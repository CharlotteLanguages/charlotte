const API_URL = "http://localhost:3000/membership";
const d = document;

const loadData = async () => {
    try {
      let res = await fetch(API_URL),
        json = await res.json();
     /*  printActivities(json); */
     printMemberships(json)
     sas(json)
    } catch (err) {
      let message = err.statusText || "ocurrió un Error";
    }
  };

  function printMemberships(membership){
    const result = membership.map(el=> el)
    const resul = membership.filter(el=> el.memberName ==="Free")
    
 
    const res = [...new Set(result)];

   /*  const container = d.querySelector(".container_memberships") */


    result.map((ele) => {
        switch (ele.memberName) {
          case "Basic":
             let input = d.querySelector(".container_memberships");
                input.innerHTML += ` 
          
                <div class="membership">
                <div>
                    <div class="price">
                        <span>$${ele.memberPrice}</span>
                    </div>
                    <span class="triangle"></span>
                </div>
                <div class="cont_membership">
                    <h1 class="membership_name">${ele.memberName}</h1>
                    <div class="membership_description">
                        <p class="description_paragraph">Lor, doloremque necto debitis natus! Excepturi ex deserunt asperna</p>
                    
                        <div class="membership_item">
                        <i class="fas fa-check-circle success"></i>
                        <p>contiene extra funciones</p>
                    </div>
                    <div class="membership_item">
                        <i class="fas fa-check-circle success"></i>
                        <p>contiene extra funciones</p>
                    </div>
                    <div class="membership_item">
                        <i class="fas fa-times-circle failure"></i>
                        <p>contiene extra funciones</p>
                    </div>
                    </div>
                    <span class="membership_price">$0.50/subscribe</span>
                    <button class="membership_button">Start now!</button>
                </div>
            </div>  
                `
            break;


          case "Pro":
            let input2 = d.querySelector(".container_memberships");
            input2.innerHTML += ` 
            <div class="membership">
            <div>
                <div class="price">
                    <span>$${ele.memberPrice}</span>
                </div>
                <span class="triangle"></span>
            </div>
            <div class="cont_membership">
                <h1 class="membership_name">${ele.memberName}</h1>
                <div class="membership_description">
                    <p class="description_paragraph">Lor, doloremque necto debitis natus! Excepturi ex deserunt asperna</p>
                
                    <div class="membership_item">
                    <i class="fas fa-check-circle success"></i>
                    <p>contiene extra funciones</p>
                </div>
                <div class="membership_item">
                    <i class="fas fa-check-circle success"></i>
                    <p>contiene extra funciones</p>
                </div>
                <div class="membership_item">
                    <i class="fas fa-times-circle failure"></i>
                    <p>contiene extra funciones</p>
                </div>
                </div>
                <span class="membership_price">$0.50/subscribe</span>
                <button class="membership_button">Start now!</button>
            </div>
        </div>
            
            `
            break;

          case "Pro +":
            let input3 = d.querySelector(".container_memberships");
            input3.innerHTML += ` 

            <div class="membership">
            <div>
                <div class="price">
                    <span>$${ele.memberPrice}</span>
                </div>
                <span class="triangle"></span>
            </div>
            <div class="cont_membership">
                <h1 class="membership_name">${ele.memberName}</h1>
                <div class="membership_description">
                    <p class="description_paragraph">Lor, doloremque necto debitis natus! Excepturi ex deserunt asperna</p>
                
                    <div class="membership_item">
                    <i class="fas fa-check-circle success"></i>
                    <p>contiene extra funciones</p>
                </div>
                <div class="membership_item">
                    <i class="fas fa-check-circle success"></i>
                    <p>contiene extra funciones</p>
                </div>
                <div class="membership_item">
                    <i class="fas fa-times-circle failure"></i>
                    <p>contiene extra funciones</p>
                </div>
                </div>
                <span class="membership_price">$0.50/subscribe</span>
                <button class="membership_button">Start now!</button>
            </div>
        </div>
            `
            break;
          case "Free":
            let input4 = d.querySelector(".container_memberships");
            input4.innerHTML += `
             
            <div class="member">
            <div>
                <div class="price">
                    <span class>Free</span>
                </div>
                <span class="triangle"></span>
            </div>
            <div class="cont_membership-free">
                <h1 class="membership_name">${ele.memberName}</h1>
                <div class="membership_description">
                    <p class="description_paragraph">Lor, doloremque necto debitis natus! Excepturi ex deserunt asperna</p>
                
                    <div class="membership_item">
                    <i class="fas fa-check-circle success"></i>
                    <p>contiene extra funciones</p>
                </div>
                <div class="membership_item">
                    <i class="fas fa-check-circle success"></i>
                    <p>contiene extra funciones</p>
                </div>
                <div class="membership_item">
                    <i class="fas fa-times-circle failure"></i>
                    <p>contiene extra funciones</p>
                </div>
                </div>
                <span class="membership_price">$0.50/subscribe</span>
                <button class="membership_button--free">Start Free trial</button>
            </div>

            <div class="cont_membership-class">
            <h1 class="membership_name--free">
            <span>Class Test</span>
            <spa class = "live"n>Live</span>
            </h1>
         
            <div class="membership_description">
                <div class="membership_item">
                <i class="fas fa-check-circle success"></i>
                <p>contiene extra funciones las cuaeles hay que plantear</p>
            </div>
           
            </div>
            <button class="membership_button--class">Start Free class</button>
        </div>
            
        </div>
            `
            break;
         
        }
      });

  
}



  d.addEventListener("DOMContentLoaded", (e) => {
    loadData();
  });
  


  
  d.addEventListener("click", (e) => {
    if (e.target.matches(".open_tooltip")  ||  e.target.matches(".icon_user") ||  e.target.matches(".user")) {
      d.querySelector(".tooltip").classList.toggle("show_tooltip");
      d.querySelector(".open_tooltip").classList.toggle("rotate");
      d.querySelector(".tooltip_message").classList.remove("show_notifications");
    }
  
    if (e.target.matches(".notifications")) {
      d.querySelector(".tooltip_message").classList.toggle("show_notifications");
      d.querySelector(".tooltip").classList.remove("show_tooltip");
      d.querySelector(".open_tooltip").classList.add("fa-chevron-down");
      d.querySelector(".open_tooltip").classList.remove("fa-chevron-up");
    }
  });


  
const select = d.querySelector(".fa-angle-down"),
options = d.querySelector("#options"),
arrowUp = d.querySelector(".fa-angle-up"),
arrowDown = d.querySelector(".fa-angle-down"),
contenSelect = d.querySelector("#select .content-select"),
hiideInput = d.querySelector("#inputSelect")


d.querySelectorAll("#options > .option").forEach(option=>{
  option.addEventListener("click", (e)=>{
    e.preventDefault();
    contenSelect.innerHTML = e.currentTarget.innerHTML
    options.classList.toggle("active")
    /* hiideInput.value = e.currentTarget.querySelector(".title").innerText; */
   /*   e.currentTarget.querySelector(".title").style.visibility = "hidden"; */

    
    
  })
})


select.addEventListener("click", ()=>{
  options.classList.toggle("active");
  arrowUp.classList.toggle("fa-angle-down");
  arrowDown.classList.toggle("fa-angle-up")
})


d.addEventListener("click", (e)=>{
    if(e.target.matches("#brasil")){
      window.location.href = "/src/views/homepage/homepagePt.html"
    }
    if(e.target.matches("#spain")){
      window.location.href = "/src/views/homepage/homepageEs.html"
    }
    if(e.target.matches("#france")){
      window.location.href = "/src/views/homepage/homepageFra.html"
    }
    if(e.target.matches("#eeuu")){
      window.location.href = "/src/views/homepage/homepage.html"
    }
  })
  