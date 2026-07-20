let display = document.getElementById("display");


function appendValue(value) {

    display.value += value;

}


function clearDisplay() {

    display.value = "";

}


function deleteLast() {

    display.value = display.value.slice(0, -1);

}


async function calculate() {

    let expression = display.value;


    let operator;

    if(expression.includes("+")) {
        operator = "+";
    }
    else if(expression.includes("-")) {
        operator = "-";
    }
    else if(expression.includes("*")) {
        operator = "*";
    }
    else if(expression.includes("/")) {
        operator = "/";
    }


    let numbers = expression.split(operator);


    let num1 = Number(numbers[0]);
    let num2 = Number(numbers[1]);


    let response = await fetch("http://127.0.0.1:5000/calculate", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            num1: num1,
            num2: num2,
            operation: operator

        })

    });


    let data = await response.json();


    display.value = data.result;
    let historyList = document.getElementById("historyList");

let li = document.createElement("li");

li.innerText = expression + " = " + data.result;

historyList.appendChild(li);
saveHistory(expression + " = " + data.result);

}
function changeTheme(){

    document.body.classList.toggle("light-mode");

}
function clearHistory(){

    document.getElementById("historyList").innerHTML = "";
    localStorage.removeItem("history");

}
document.addEventListener("keydown", function(event){

    let key = event.key;


    if(
        key >= "0" && 
        key <= "9" || 
        key === "+" || 
        key === "-" || 
        key === "*" || 
        key === "/" || 
        key === "."
    ){

        appendValue(key);

    }


    else if(key === "Enter"){

        calculate();

    }


    else if(key === "Backspace"){

        deleteLast();

    }


    else if(key === "Escape"){

        clearDisplay();

    }

});
function squareRoot(){

    let value = Number(display.value);

    display.value = Math.sqrt(value);

}


function square(){

    let value = Number(display.value);

    display.value = value * value;

}


function power(){

    let value = Number(display.value);

    let result = value ** 2;

    display.value = result;

}
function saveHistory(value){

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.push(value);

    localStorage.setItem("history", JSON.stringify(history));

}


function loadHistory(){

    let history = JSON.parse(localStorage.getItem("history")) || [];

    let historyList = document.getElementById("historyList");


    history.forEach(item => {

        let li = document.createElement("li");

        li.innerText = item;

        historyList.appendChild(li);

    });

}


window.onload = loadHistory;