const display = document.getElementById("expression");
const buttons = document.querySelectorAll(".btn");

let expression = "";

//Tokenizer

function tokenize(expr){
    const tokens = [];
    let currentNumber = "";

    for(let char of expr){
        if(!isNaN(char) || char === "."){
            currentNumber += char;
        }else{
            if(currentNumber!== ""){
                tokens.push(Number(currentNumber));
                currentNumber="";
            }
            tokens.push(char);
        }
    }
    if (currentNumber !== "") {
    tokens.push(Number(currentNumber));
    }

    return tokens;
}