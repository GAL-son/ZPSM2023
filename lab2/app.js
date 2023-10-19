
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
function weightedAverage(user) {
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

weightedAverage(user);

// Zad 4
console.log("Zad 4")
function findSubjectWithWeight(user, weight) {
    let subject = _.find(user.allGrades, (o) => {return o.weight === weight});
    console.log(subject.subjectName);
}

findSubjectWithWeight(user, 1);

// Zad 5
console.log("Zad 5");

function getMails(items) {
    let strings = _.filter(items, (o) => {return typeof(o) === typeof("text")});
    const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const mails = _.filter(strings, rx => mailRegex.test(rx));
    console.log(mails);
}

const collections = [
    {},
    15,
    "hello@test.pl",
    null,
    ['aaa', 'bbb', '5'],
    'admin@gmail.com',
    undefined,
    'a34@yahoo.com',
    '231@1',
    '321.pl'
];

getMails(collections);