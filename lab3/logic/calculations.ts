const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const basicOperations = ['+', '-', '*', '/'];
const advancedOperations = [
    'sin', 'cos', 'tan',
    'sinh', 'cosh', 'tanh',
]

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

            console.log(item);

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
        try {
            const result = eval(this.text);
            const resultItems = String(result).split("");
            this.items = resultItems;
        } catch (e) {
            this.isError = true;
            this.items = ["ERROR"];
        }
    }

    getText(): string {
        this.itemsToText();
        return this.text;
    }

    itemsToText(): void {
        this.text = "";
        this.items.forEach(element => {
            this.text += element;
        });
    }

    clearError() {
        if (this.isError) {
            this.items = [];
            this.isError = false;
        }
    }
}

export default Calculator;