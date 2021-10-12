// Global variables
let displayValue = '0';
let inputs = [];
let currentSum =[];
let newInput = true;

// Selector variables
const output = document.querySelector('#output-div');

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', buttonPress);
})

// Set initial display value
output.textContent = displayValue;

// Operator functions
function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return parseInt(a) - parseInt(b);
}

function multiply(a, b) {
    return parseInt(a) * parseInt(b);
}

function divide(a, b) {
    return parseInt(a) / parseInt(b);
}

function operate(operator, a, b) {
    let funcName = window[operator];
    return funcName(a, b);
}

// Helper functions
function buttonPress() {
    const button = this.dataset.button;
    const buttonType = this.dataset.type;
    const sumArrayLength = currentSum.length;

    // If all clear is pressed, reset all values and clear the display
    if (button === 'all-clear') {
        allClear();
    }

    // If flip is pressed, do flip things
    
    // If current sum array is empty or has 1 elements:
    if (!sumArrayLength || sumArrayLength === 1) {

        // if NUMBER pressed:
        if (buttonType === 'number') {
            // if first input, set display to number
            if (newInput) {
                output.textContent = button;
                newInput = false;
            } else {
                // add number to display
                output.textContent += button;
            }
            displayValue = output.textContent;
        }

        // if SYMBOL pressed:
        if (buttonType === 'symbol') {
            // add display to current sum array[0]
            currentSum[0] = displayValue;

            // add symbol to current sum array[1]
            currentSum[1] = button;

            // HIGHLIGHT SYMBOL

            // set new input value
            newInput = true;
        }
    }

    // If current sum array length 2 or 3:
    if (sumArrayLength === 2 || sumArrayLength === 3) {
        // if NUMBER pressed:
        if (buttonType === 'number') {
            // if first input, set display to number
            if (newInput) {
                output.textContent = button;
                newInput = false;
            } else {
                // add number to display
                output.textContent += button;
            }
            displayValue = output.textContent;
        }

        // if SYMBOL pressed:
        if (buttonType === 'symbol') {
            currentSum[2] = displayValue;
            // do the sum
            let answer = operate(currentSum[1], currentSum[0], currentSum[2]);
            // output answer to screen
            displayValue = answer;
            output.textContent = displayValue;
            // clear current sum array
            currentSum = [];
            // add display to current sum array[0]
            currentSum[0] = displayValue;
            // add symbol to current sum array[1]
            currentSum[1] = button;
            
            // set new input value
            newInput = true;

            // HIGHLIGHT SYMBOL
        }
    }

    console.log(currentSum);
}

// All clear function
function allClear() {
    displayValue = '0';
    inputs = [];
    currentSum =[];
    newInput = true;
    output.textContent = displayValue;
}