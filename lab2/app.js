
// Zad 1,2
console.log("Zad 1, 2");
const _ = require('lodash');

let arr = [1,2,4,6,8,4,4,5];
console.log(arr);

let mean = _.mean(arr);
let min = _.min(arr);
let max = _.max(arr);

console.log("mean = " + mean);
console.log("mean = " + min);
console.log("mean = " + max);

// Zad 3
console.log("Zad 3");
function weighted_average(user) {
    let gradesWeightedSum = 0;
    let weightsSum = 0;
    for(const elem of user.allGrades) {
        weightsSum += elem.weight * elem.grades.length;
        gradesWeightedSum += _.sum(elem.grades) * elem.weight;
    }

    let weightedAverage = gradesWeightedSum / weightsSum;

    console.log(user.name + ' ' + user.surname + ': ' + weightedAverage );
}

const user = {
    name: 'Imie',
    surname: 'Nazwisko',
    allGrades: [
        {
            subjectName: 'name1',
            grades: [5,4,3,5,2],
            weight: 3
        },
        {
            subjectName: 'name2',
            grades: [3, 3.5, 2],
            weight: 1
        },
        {
            subjectName: 'name3',
            grades: [4,3,3.5],
            weight: 5
        }
    ]
}

weighted_average(user);