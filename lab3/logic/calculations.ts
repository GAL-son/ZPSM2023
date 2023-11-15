import {evaluate, randomInt} from "mathjs";


const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const basicOperations = ['+', '-', '*', '/'];
const functions = [
    'sin', 'cos', 'tan',
    'sinh', 'cosh', 'tanh',
    'ln', 'log10', 
    '√(2)', '√(3)', '√(x)',
];

const symbols = ['e', 'pi'];
const parentecies = ['(', ')'];

const parsed = [
    ['x^2', "^2"], ['x^3', "^3"], ['x^y', "^"],
    ["x!", "!"], ['EE', '*10^'],
]

const roots = [
    ['√(2)', 'sqrt'], ['√(3)', 'qbrt'], ['√', 'nthRoot']
]

// Reference function list
// const operations = [
//     '(', ')', 'mc', 'm+', 'm-', 'mr', 'AC', '+/-', '%', '<==',
//     '2nd', 'x^2', 'x^3', 'x^y', 'e^x', '10^x', '7', '8', '9', '/',
//     '1/x', '√(2)', '√(3)', '√(x)', 'ln', 'log10', '4', '5', '6', '*',
//     'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '-',
//     'Rad', 'sinh', 'cosh', 'tanh', 'pi', 'Rand', '0', '.', '=', '+',
// ];

class Calculator {
    text: string = "";
    equation: string = "";
    items: string[] = [];

    isError: boolean = false;
    wasNegated = false;

    memory: number = 0;
    isMemorySet: boolean = false;

    input(item: string) {
        this.clearError();
        // Add new item to queue
        let last = this.items.at(this.items.length - 1);
        // TODO: Create operations logic

        if(item == '+/-') { 
            console.log(this.wasNegated);
            if(this.wasNegated) {
                console.log(this.items);
                for(let i = this.items.length - 1; i > 0; i--) {
                    if(this.items.at(i) == "-" && this.items.at(i-1) == "(") {
                        console.log(i)
                        this.items.splice(i-1, 2);
                        return;
                    }
                }
                // for(let i = this.text.length-1; i > 0 ; i--) {
                //     //console.log(this.text.substring(i-1, i+1))
                //     if(this.text.substring(i-1, i+1) == "(-") {
                //         this.items.splice(i-3, 2);
                //         this.wasNegated = false;
                //         return;
                //     }
                // }
                
            }    
            this.wasNegated = true;        
            
            let depth = this.items.length - 1;
            while(depth >= 0) {
                let current = this.items.at(depth);
                if(basicOperations.includes(current)) {
                    this.items.splice(depth+1, 0, '(', '-');
                    return;
                }
                if(parentecies.includes(current)) {
                    if(numbers.includes(this.items.at(depth+1))) {
                        this.items.splice(depth+1, 0, '(', '-');
                        return;
                    }
                    if(functions.includes(this.items.at(depth-1))) {
                        console.log("fun")
                        this.items.splice(depth-1, 0, '(', '-');                        
                    } else {
                        this.items.splice(depth, 0, '(', '-');                        
                    }
                    return;
                }
                depth--;
            }
            this.items.splice(depth+1, 0, '(', '-');            
            this.wasNegated = true;
        } else {
            this.wasNegated = false
        }
        

        if(item == "e^x") {
            this.items = ["e","^","("].concat(this.items);
            return
        }

        if(item == "1/x") {
            this.items = ["1","/","("].concat(this.items);
            return;
        }

        if(item == "Rand") {
            this.items.push(randomInt(0,9).toString());
            return;
        }
        
        if(item == '√(x)') {
            this.items = ["√","("].concat(this.items).concat(',');
            return;
        }

        if(item == '%') {
            this.items = this.items.concat('/100');
            return;
        }

        if(item == "Rad") {
            this.items = ["("].concat(this.items).concat(")*(pi/180)".split(""));
            return;
        }

        if(item == "10^x") {
            this.items.push("10^");
            return;
        }

        // Handle numbers logic
        if (numbers.includes(item)) {

            // Check if 0 is typed on the begining of equation or after sign and change to 0.
            if (item == '0' && !(numbers.includes(last))) {
                this.items.push(item);
                this.items.push(".");
                return;
            }

            if(symbols.includes(last)) {
                this.items.push("*");
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

        // Handle symbols
        if(symbols.includes(item)) {
            if(numbers.includes(last)) {
                this.items.push('*');
            }
            this.items.push(item);
            return;
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

        // Handle parsing from buttons
        let parsePair = parsed.find(e => e[0] === item);
        if(parsePair != undefined) {            
            if(item[0] == 'x' && (!(numbers.includes(last)) && !(parentecies.includes(last)))) {
                this.items.push("0")
            }
            this.items.push(parsePair[1]);
            return;
        }
        
        // Handle Advanced Operation


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
        console.log(this.equation);
        //if(!numbers.includes)
        try {
            const result = evaluate(this.equation).toPrecision(8);
            //console.log(result);
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
            let parsePair = roots.find(e => e[0] === element);   
            if(parsePair != undefined) {            
                this.equation += parsePair[1];
                return;
            }      
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

    memoryAdd() {
        if(!this.isError) {
            this.memory += parseFloat(this.text);
            this.isMemorySet = true;
        }        
    }

    memorySubtract() {
        if(!this.isError) {
            this.memory -= parseFloat(this.text);
            this.isMemorySet = true;
        }   
    }

    memoryRecall() {
        if(!this.isMemorySet) return;
        this.items.push(this.memory.toString());
    }

    memoryClear() {
        this.isMemorySet = false;
        this.memory = 0;
    }


}

export default Calculator;