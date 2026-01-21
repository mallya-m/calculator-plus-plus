const display = document.getElementById("currentNumber");
const buttons = document.querySelectorAll(".btn");

let currentNumber = "";

//Tokenizer
function tokenize(expr){
    const tokens = [];
    let tempNumber = "";

    for(let char of expr){
        if( (char >= "0" && char <= "9")  || char === "."){
            tempNumber += char;
        }else{
            if(tempNumber!== ""){
                tokens.push(Number(tempNumber));
                tempNumber="";
            }
            tokens.push(char);
        }
    }
    if (tempNumber !== "") {
    tokens.push(Number(tempNumber));
    }

    return tokens;
}
//Evaluation
function evaluateTokens(tokens){
    let result = [...tokens];

    for(let i = 0 ; i < result.length ; i++){
        if(result[i] === "*" || result[i] === "/"){
            const left = result[i-1];
            const right = result[i+1];
            const value = result[i]=== "*" ? left * right : left / right ;

            result.splice(i-1, 3 , value);
            i--;
        }
    }
    for(let i=0; i< result.length ; i++){
        if(result[i] === "+" || result[i] === "-"){
            const left = result[i-1];
            const right = result[i+1];
            const value = result[i]==="+" ? left+right : left - right ;

            result.splice(i-1,3,value);
            i-- ;
        }
    }
    return result[0];
}
//Button click handling
buttons.forEach(button =>{
    button.addEventListener("click",()=>{
        const value = button.dataset.value;
        handleInput(value);
    });
});

function handleInput(value){
    if(value === "C") clearAll();
    else if(value === "DEL") deleteLast();
    else if(value === "=") calculate();
    else appendValue(value);
}
function updateDisplay(){
    display.textContent = currentNumber || 0 ;
}

function appendValue(value){
    if(currentNumber === "0"){
        currentNumber = value;
    }else{
        currentNumber += value ;
    }
    updateDisplay();
}

function clearAll(){
    currentNumber ="";
    updateDisplay();
}
function calculate(){
    try{
        const result = eval(currentNumber);
        currentNumber = result.toString();
        updateDisplay();
    }catch{
        currentNumber = "";
        display.textContent = "error";
    }
}
//Keyboard support

document.addEventListener("keydown",(e)=>{
    const key = e.key ;
    if (
        (key >= "0" && key <="9")||
        key === "+" || key ==="-"||
        key === "*" || key ==="/"||
        key === "."
    ){
        handleInput(key);
    }
    if(key === "Enter"){
        e.preventDefault();
        handleInput("=");
    }
    if(key === "Backspace"){
        deleteLast();
    }
    if(key === "Escape"){
        handleInput("C");
    }
});

function deleteLast(){
    currentNumber = currentNumber.slice(0,-1);
    updateDisplay();
}


