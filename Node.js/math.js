const sum = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const power = (a, b) => a ** b;

const g = 9.8;
const Pi = 3.14;

let obj = {
  sum: sum,
  mul: mul,
  sub: sub,
  power: power,
  g: g,
  Pi: Pi,
};

module.exports = obj;
