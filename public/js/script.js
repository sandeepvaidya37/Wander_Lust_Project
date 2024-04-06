// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })();

  let taxSwitch = document.querySelector(".tax-switch");
  let GST = document.getElementsByClassName("GST");

  taxSwitch.addEventListener("click", (e)=>{


      for(info of GST){
        if(taxSwitch.checked == false){
          info.style.display = "none";
        }else{
          info.style.display = "initial";
        }
      }
    
  });

  