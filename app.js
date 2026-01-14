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
        return result[0];
    }
}