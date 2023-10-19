const _ = require('lodash');

let arr = [1,2,4,6,8,4,4,5];
console.log(arr);

let mean = _.mean(arr);
let min = _.min(arr);
let max = _.max(arr);

console.log("mean = " + mean);
console.log("mean = " + min);
console.log("mean = " + max);