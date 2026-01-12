const display = document.getElementById("expression");
const buttons = document.querySelectorAll(".btn");

let expression = "";

buttons.forEach((button) =>{
    button.addEventListener("click",()=>{
        const value = button.dataset.value ;

        if(value === "C"){
            expression = "";
            display.textContent = "0";
            return;
        }
        if(value === "="){
            //Operations
            return;
        }
        expression += value ;
        display.textContent = expression ;

    });
});