class Calculator {

    constructor(currentNumberTextElement, previousNumberTextElement) {
        this.currentNumberTextElement = currentNumberTextElement;
        this.previousNumberTextElement = previousNumberTextElement;
        this.clear();
    };

    // clears the current number, previous number and the previous operator
    clear() {
        this.currentNumber = '';
        this.previousNumber = '';
        this.operator = undefined;
    };

    // append the number parameter to the currentNumber string
    appendNumber(number) {
        if(number === "." && this.currentNumber.includes('.')) return;
        this.currentNumber = this.currentNumber.toString() + number.toString();
    };

    // sets the operator that will be used in the calculation
    // assigns the previous number to the current number and then clears the current number
    getOperator(operator) {
        if(this.currentNumber === '') return;
        if(this.previousNumber !== '') {
            this.calculate();
        }
        this.operator = operator;
        this.previousNumber = this.currentNumber;
        this.currentNumber = '';

    };

    // calculates the numbers previded with the operator previded
    calculate() {
        if (isNaN(this.currentNumber) || isNaN(this.previousNumber)) return;
        switch(this.operator) {
            case '+':
                this.currentNumber = parseFloat(this.previousNumber) + parseFloat(this.currentNumber);
                break;
            case '-':
                this.currentNumber = parseFloat(this.previousNumber) - parseFloat(this.currentNumber);
                break;
            case '*':
                this.currentNumber = parseFloat(this.previousNumber) * parseFloat(this.currentNumber);
                break;
            case '÷':
                this.currentNumber = parseFloat(this.previousNumber) / parseFloat(this.currentNumber);
                break;
            default:
                return;
        }

        this.previousNumber = "";
        this.operator = undefined;
    };

    delete() {
        this.currentNumber = this.currentNumber.slice(0, -1);
        this.displayOperations();
    };

    // inserts the current number, previous number and operator into the dom
    displayOperations() {
        this.currentNumberTextElement.innerText = this.currentNumber; 
        if(this.operator !== undefined) {
            this.previousNumberTextElement.innerText = `${this.previousNumber} ${this.operator}`;
        }
        else {
            this.previousNumberTextElement.innerText = '';
        }
    };

};

const previousNumberTextElement = document.getElementById("previous-number");
const currentNumberTextElement = document.getElementById("current-number");

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const backButton = document.querySelector('[data-back]');
const clearButton = document.querySelector('[data-clear]');
const equalsButton = document.querySelector('[data-equals]');

const calculator = new Calculator(currentNumberTextElement, previousNumberTextElement);

numberButtons.forEach(number => {
    number.addEventListener("click", () => {
        calculator.appendNumber(number.innerText);
        calculator.displayOperations();
    })
});

operatorButtons.forEach(operator => {
    operator.addEventListener("click", () => {
        calculator.getOperator(operator.innerText);
        calculator.displayOperations();
    })
});

equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.displayOperations();
});

backButton.addEventListener("click", () => {
    calculator.delete();
});

clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.displayOperations();
});