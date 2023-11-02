import {evaluate} from "mathjs";

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const basicOperations = ['+', '-', '*', '/'];
const functions = [
    'sin', 'cos', 'tan',
    'sinh', 'cosh', 'tanh',
    'ln', 'log10',
];
const parentecies = ['(', ')'];

const operations = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'AC', '+/-', '%', '<==',
    '2nd', 'x^2', 'x^3', 'x^y', 'e^x', '10^x', '7', '8', '9', '/',
    '1/x', '√(2)', '√(3)', '√(x)', 'ln', 'log10', '4', '5', '6', '*',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '-',
    'Rad', 'sinh', 'cosh', 'tanh', 'pi', 'Rand', '0', '.', '=', '+',
];

class Calculator {
    text: string = "";
    equation: string = "";
    items: string[] = [];

    isError: boolean = false;

    input(item: string) {
        this.clearError();
        // Add new item to queue
        let last = this.items.at(this.items.length - 1);
        // TODO: Create operations logic

        // Handle numbers logic
        if (numbers.includes(item)) {

            // Check if 0 is typed on the begining of equation or after sign and change to 0.
            if (item == '0' && !(numbers.includes(last))) {
                this.items.push(item);
                this.items.push(".");
                return;
            }

            // Handle period
            if (item == '.') {
                console.log("kropka");
                
                // Check if dot is the begining of a number and change to 0.
                if(!(numbers.includes(last))) {
                    this.items.push('0');
                    this.items.push('.');
                    return;
                }

                // Check if the dot ocurred in last number
                let depth = this.items.length - 1;
                while (depth >= 0) {
                    let check = this.items.at(depth);
                    console.log("Depth:" + depth);
                    if (check == '.') {
                        return;
                    }

                    if (!(numbers.includes(check))) {
                        this.items.push(item);
                        return;
                    }
                    depth--;
                }
                this.items.push(item);
                return;
            }

            this.items.push(item);
            return; // TO DELETE
        }

        // Handle basic operations
        if(basicOperations.includes(item)) {
            if(last == '.' || basicOperations.includes(last)) {
                this.items.pop();
            }

            this.items.push(item);
            return;
        }

        // Handle parentecies
        if(parentecies.includes(item)) {
            if(item == '(' && numbers.includes(last)){
                this.items.push('*');
            }
            this.items.push(item);
            return;
        }

        // Handle functions
        if(functions.includes(item)) {
            if(numbers.includes(last)){
                this.items.push('*');
            }
            this.items.push(item);
            this.items.push('(');
            
            return;
        }
        
        // Handle Advanced Operation

        this.items.push(item);
    }

    delete() {
        this.clearError();
        this.items.pop();
    }

    clear() {
        this.clearError();
        this.items = [];
        this.text = "";
    }

    calculate() {
        let last = this.items.at(this.items.length - 1);
        let unclosed = 0;
        this.items.forEach(element => {
            if(element == '(') unclosed++;
            if(element == ')') unclosed--;
        });

        for(let i = unclosed; i > 0; i--) {
            this.items.push(')');
        }
        this.itemsToText();
        this.itemsToEquation();
        console.log(this.text);
        //if(!numbers.includes)
        try {
            const result = evaluate(this.equation).toPrecision(8);
            console.log(result);
            const resultItems = String(result).split("");
            this.items = resultItems;
        } catch (e) {
            console.log("ERROR");
            this.isError = true;
        }

    }

    getText(): string {
        if(this.isError) return "ERROR";
        this.itemsToText();
        return this.text;
    }

    itemsToText(): void {
        this.text = "";
        this.items.forEach(element => {
            this.text += element;
        });
    }

    itemsToEquation() : void {
        this.equation = "";
        this.items.forEach(element => {
            this.equation += element;
        });
    }

    clearError() {
        if (this.isError) {
            this.items = [];
            this.isError = false;
        }
    }

    makeError( ) {
        this.isError = true;
    }
}

export default Calculator;