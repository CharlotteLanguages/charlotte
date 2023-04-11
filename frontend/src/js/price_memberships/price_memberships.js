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
    const result = membership.filter(el=> el.memberName !=="Free")
    const resul = membership.filter(el=> el.memberName ==="Free")
    
    console.log(result)
    const res = [...new Set(result)];
    const container = d.querySelector(".container_memberships")
    const ap = result.map(ele =>{        
        container.innerHTML += `
        <div class="membership">
        <div>
            <div class="price">
                <span>${ele.memberPrice}</span>
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
    })
    const aps = resul.map(ele =>{        
        container.innerHTML += `
        <div class="membership">
        <div>
            <div class="price">
                <span>${ele.memberPrice}</span>
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
            <button class="membership_button--free">Start Free trial!</button>
        </div>
        
    </div>
        `
    })

   /*  const esult = membership.filter(membership=>membership)

      esult.map(member => {
         switch (member.memberName) {
             case `${ele}`:
                console.log(ele)
               const input =  d.querySelector(".cont_membership");
               input.forEach(element => {
                 element+=`
                 <div class="membership_item">
                 <i class="fas fa-times-circle failure ${member.memberCategory}"></i>
                 <p>${member.memberDescription}</p>
                   
                 </div>
                 `
               });
                 break;
       
             default:
                 break;
         }
         
     })
  */
   
  
}



  d.addEventListener("DOMContentLoaded", (e) => {
    loadData();
  });
  

