// Global variables
let displayValue = '0';
let inputs = [];
let currentSum =[];
let newInput = true;
let currentRotation = 0;

// Selector variables
const output = document.querySelector('#output-div');
const calculator = document.querySelector('#calculator-div');

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', handleInput);
})

document.addEventListener('keydown', handleInput);

// Set initial display value
updateDisplay(0);

// Operator functions
function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    if (parseFloat(a) === 0 || parseFloat(b) === 0) {
        return 'Nice try!';
    } else {
        return parseFloat(a) / parseFloat(b);
    }
}

function operate(operator, a, b) {
    let funcName = window[operator];
    return funcName(a, b);
}

// Input handling
function handleInput(event) {
    let button = null;
    let buttonType = null;

    // determine event type
    if (event.type === 'click') {
        button = this.dataset.button;
        buttonType = this.dataset.type;
    } else if (event.type === 'keydown') {
        [ button, buttonType ] = getButtonValues(event.key);
    }

    if (buttonType === 'number') {
        handleNumber(button);
    } else if (buttonType === 'operator') {
        handleOperator(button);
    } else if (buttonType === 'symbol'){
        handleSymbol(button);
    }
}


// Function for when a number is pressed
function handleNumber(button) {
    let number = '';
    // if first input, set number to button value
    if (newInput) {
        number = button;
        newInput = false;
    } else {
        // add button value to end of display value
        number = displayValue + button;
    }
    updateDisplay(number);
}

// Function for when an operator is pressed
function handleOperator(button) {
    const sumArrayLength = currentSum.length;

    // If current sum array is empty or has 1 elements:
    if (!sumArrayLength || sumArrayLength === 1) {
        // add display to current sum array[0]
        currentSum[0] = displayValue;

        // Handle equals sign exception
        if (button != 'equals') {
            // add symbol to current sum array[1]
            currentSum[1] = button;
        }

        // HIGHLIGHT SYMBOL

        // set new input value
        newInput = true;

    } else if (sumArrayLength === 2 || sumArrayLength === 3) {
        // If current sum array length 2 or 3:
        currentSum[2] = displayValue;
        // do the sum
        let answer = operate(currentSum[1], currentSum[0], currentSum[2]);
        // output answer to screen
        updateDisplay(answer);
        // clear current sum array
        currentSum = [];
        // add display to current sum array[0]
        currentSum[0] = displayValue;

        // Handle equals sign exception
        if (button != 'equals') {
            // add symbol to current sum array[1]
            currentSum[1] = button;
        }

        // set new input value
        newInput = true;
    }
}

// Function for when a symbol is pressed (neither a number or operator)
function handleSymbol(button) {
    
    switch(button) {
        case 'all-clear':
            allClear();
            break;
        
        case 'flip':
            flip();
            break;
        
        case 'invert':
            invert();
            break;

        case 'percent':
            percent();
            break;

        case 'decimal':
            decimal();
            break;
    }
}

// Symbol functions
function allClear() {
    inputs = [];
    currentSum =[];
    newInput = true;
    updateDisplay(0);
}

function flip() {
    if (currentRotation === 0) {
        calculator.style.animation = 'rotation-0 2s ease-in-out forwards';
        currentRotation = 180;
    } else {
        calculator.style.animation = 'rotation-180 2s ease-in-out forwards';
        currentRotation = 0;
    }
}

function invert() {
    updateDisplay(displayValue * -1);
}

function percent() {
    updateDisplay(displayValue / 100);
}

function decimal() {
    let displayValueString = displayValue.toString();
    // Check for existing decimal point
    if (!displayValueString.includes('.')) {
        updateDisplay(displayValue + '.');
        newInput = false;
    }
}

function updateDisplay(value) {
    // takes an answer and shortens / fits it to the screen;
    if (isNaN(value)) {
        output.textContent = value;
        setTimeout(() => {output.textContent = displayValue}, 1000)
    } else {
        if (value.toString().length <= 7) {
            displayValue = value;
            output.textContent = displayValue;
        } else {
            output.textContent = "Too large!";
            setTimeout(() => {output.textContent = displayValue}, 1000)
        }
    }
}

function getButtonValues(input) {
    let button = null;
    let buttonType = null;
    console.log(input);

    // If the input is a number
    if (!isNaN(input)) {
        button = input;
        buttonType = 'number';
        return [ button, buttonType ];
    }

    // If the input is an operator
    const operatorRegex = (/[\-\+\*\/=]/i);
    if (input.match(operatorRegex)) {
        switch(input) {
            case '-':
                button = 'subtract';
                break;
            
            case '+':
                button = 'add';
                break;

            case '*':
                button = 'multiply';
                break;

            case '/':
                button = 'divide';
                break;
            
            case '=':
                button = 'equals';
                break;
        }

        buttonType = 'operator';
        return [ button, buttonType ];
    }

    const symbolRegex = (/[.%]/i);
    if (input.match(symbolRegex)) {
        switch(input) {
            case '.':
                button = 'decimal';
                break;

            case '%':
                button = 'percent';
                break;
        }

        buttonType = 'symbol';
        return [ button, buttonType ];
    }

    // if there are no matches, return null
    return [ null, null ]

}