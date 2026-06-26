let arg = process.argv;

for (let i = 2; i < arg.length; i++) {
  // 0 11 generates the process path
  console.log("Hello to", arg[i]);
}

const math = require("./math");
//console.log(math);
console.log(math.sum(2, 42));
console.log(math.power(2, 2));
console.log(math.g);
console.log(math.Pi);
console.log(math.sub(52, 34));
console.log(math.mul(24, 3));

const fruits = require("./Fruits/index");
console.log(fruits);
console.log(fruits[0].cost);
