let result = '';
let oper = '';
let history = [];
let able = true;
let resultHistory = [];
let count = 0;
let temp = 0;
let num = '';
let equal = false;


const displayMain = document.querySelector(".row-2");
const displaySub = document.querySelector(".row-1");

const displayNumber = (number) => {

    // checks if error is present
    if (able) {

        // checks if the equal sign has been pressed and if next value is a number
        if (equal && !isNaN(history[history.length - 1])) {
            clearDisplay();
        }
        
        equal = false;
        history.push(number.innerHTML);

        // appends number to display screen
        displaySub.innerHTML += number.innerHTML;

        // checks if two points were inputted
        if (history[history.length - 1] == '.' && history[history.length - 2] == '.') { /* isNaN (Not a Number) */
            displayMain.innerHTML = 'Error';
            able = false;       
        } else {

            // split the expression into parts
            let expression = displaySub.innerHTML.split(' ');

            // check that the current input is a number and not an operator for calculation
            if ((expression.length) % 2 == 1) {
                // console.log(`history1: ${history}`);
                // during the first calculation, checks if the penultimate input was a number ready for calculation
                if (!isNaN(history[history.length - 2]) || !isNaN(history[history.length - 3])) {
                    
                    // checks if the temporary result (first number inputted) has been stored
                    if (temp !== 0) {
                        // console.log(`temp: ${temp}`);
                        
                        // assigns the value to the result history since it's initially empty
                        resultHistory[resultHistory.length - 1] = temp;
                        temp = 0;
                    
                    // after a single digit calculation, check if the same input is now double digits or larger and remove the last result
                    } else if (temp == 0 && !isNaN(history[history.length - 2])) {                                             
                        resultHistory.pop();
                        // console.log('popped');
                    }
                    // console.log(`count: ${count}`);
                    // count the number of digits in the input
                    count++;
                    // console.log(`history: ${history}`);
                    // console.log(`resultHistory: ${resultHistory}`);
                    // join the digits from history to get the final number
                    num = history.slice(-count).join('');
                    // console.log(`last num: ${num}`);
                    // get the expression of the calculation, two numbers and an operator
                    expression = resultHistory[resultHistory.length - 1] + oper + num;
                    expression = expression.split(' ');
                    // console.log(`expression: ${expression}`);
                } else {
                    // for single digit calculations
                    count = 0;                    
                    expression = resultHistory[resultHistory.length - 1] + oper + number.innerHTML;
                    expression = expression.split(' ');
                    // console.log("single");
                }
                // console.log('');
                subTotal(expression);
            }
        }
    } else {
        displayMain.innerHTML = 'Error';
        able = false; 
    }
}

// reset the variables
const clearDisplay = () => {
    displayMain.style.fontSize = "40px"
    displayMain.innerHTML = '';
    displaySub.innerHTML = '';
    resultHistory = [];
    history = [];
    result = '';
    oper = '';
    able = true;
    count = 0;
    temp = 0;
    equal = false;
}

const operation = (operator) => {
    if (able) {
        count = 0;

        // checks if it's the first calculation
        if (temp == 0 && displayMain.innerHTML == '') {
            temp = displaySub.innerHTML;
            // console.log('hello');
        } 
        
        // console.log(`temp from operation: ${temp}`);
        // console.log('');
        
        history.push(operator.innerHTML);

        // checks for double operator input errors
        if (isNaN(history[history.length - 1]) && isNaN(history[history.length - 2])) {
            displayMain.innerHTML = 'Error';
            able = false;       
        }

        // adds the operator to the display screen
        oper = ' ' + operator.innerHTML + ' ';
        displaySub.innerHTML +=  oper;

        return oper;
    }
}

const equals = () => {
    if (able) {
        // checks if the main display is empty (no calculation done)
        if (displayMain.innerHTML == '' && !isNaN(history[history.length - 1])) {
            displayMain.innerHTML = displaySub.innerHTML;
        } else if (displayMain.innerHTML == '' && isNaN(history[history.length - 1])){
            displayMain.innerHTML = 'Error';
                    able = false; 
        }

        // increase the font size when equals is pressed
        displayMain.style.fontSize = "50px";
        // reset variables
        displaySub.innerHTML = '';
        equal = true;
        first = true;
        temp = 0;
        resultHistory = [];

        // store the final result
        result = displayMain.innerHTML;
        resultHistory.push(result);
    }
}

const subTotal = (expression) => {
    const num1 = Number(expression[0]);
    const num2 = Number(expression[2]);
    const op = expression[1];
    
    switch(op) {
        case '+':
            result = displayMain.innerHTML = Math.round((num1 + num2)*100000)/100000;
            break;
        case '-':
            result = displayMain.innerHTML = Math.round((num1 - num2)*100000)/100000;
            break;
        case 'x':
            result = displayMain.innerHTML = Math.round((num1 * num2)*100000)/100000;
            break;
        case '/':
            if (num2 == 0) {
                displayMain.innerHTML = 'Error';
                able = false; 
            } else {
            result = displayMain.innerHTML = Math.round((num1 / num2)*100000)/100000;
            break;
            }
    }

    resultHistory.push(result);
}
