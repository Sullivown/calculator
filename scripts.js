// Global variables
let displayValue = '0';
let inputs = [];
let newInput = true;
let previousType = null;

// Selector variables
const output = document.querySelector('#output-div');

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', buttonPress);
})

// Set initial display value
output.textContent = displayValue;

// Operator functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

// Helper functions
function buttonPress() {
    const button = this.dataset.button;
    const buttonType = this.dataset.type;

    // if a number button
    if (buttonType === 'number') {
        // If the previous input was a symbol
        if (previousType === 'symbol') {
            // add the symbol to the input array
            inputs.push(displayValue);

            // clear the display and show the number
            newInput = true;
            updateDisplay(button);

        } else {
            // If the previous input was a number or null

            // append the number to the existing display
            updateDisplay(button);
        }

        // Update the previous input variable to reflect the new type
        previousType = 'number'

    } else {
        // It is a symbol

        // If the previous input was a number
        if (previousType === 'number') {
            // add the number to the input array
            inputs.push(displayValue);

            // clear the display and show the symbol
            newInput = true;
            updateDisplay(button);

        } else if (previousType === 'symbol') {
            // clear the display and show the symbol
            newInput = true;
            updateDisplay(button);
        } else {
            // If the previous type is null, just return
            return;
        }

        // Update the previous input variable to reflect the new type
        previousType = 'symbol';


    }

    console.log(inputs)

}


// Populate the display when inputs detected
function updateDisplay(button) {
    if (newInput === true) {
        displayValue = button;
        output.textContent = button;
        newInput = false;
    } else {
        displayValue += button;
        output.textContent += button;
    }
}

// Clear the display and reset all values
function clear() {
    displayValue = "0";
    inputs = [];
    output.textContent = displayValue;
}
