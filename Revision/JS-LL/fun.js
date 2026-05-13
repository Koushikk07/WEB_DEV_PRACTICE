//funtion for roll a dice

function print(n) {
  for (let i = 0; i < n; i++) {
    console.log(i + 1);
  }
}

//print(10);

// roll a dice

function dice() {
  //console.log(Math.floor(Math.random() * 6) + 1);
  return Math.floor(Math.random() * 6) + 1;
}

//console.log(dice());

//average of 3 nums

function avg(a, b, c) {
  console.log((a + b + c) / 3);
}

//avg(12, 4, 56);

//prints the multiplication table of a number

function table(n) {
  console.log("Multiplication Table of", n);
  for (let i = 1; i <= 10; i++) {
    console.log(i, "x", n, "=", i * n);
  }
}

//table(8);
//sum of 1 to N numbers

function Sum(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

//console.log(Sum(1));

//concat of arrays

function concatArray(arr) {
  let ans = "";

  for (let i = 0; i < arr.length; i++) {
    ans = ans + arr[i] + " ";
  }
  return ans;
}

let arr = [
  "koushik",
  "aditya",
  "narender",
  "venu",
  "suresh",
  "ramesh",
  "ajamu",
];
//console.log(concatArray(arr));

//Funcitons EXpressions

//storing  the function in a  variable NOTE no name for funtion variable name itself a name of function

let sum = function (a, b) {
  console.log(a + b);
};

//sum(10, 2);

//HIGHER ORDER FUNCTIONS
/* 
def: A function that does one or both:
1.takes one or multiple functions as argumens
2. returns a function

*/

// METHODS -- actions that can be performed on an object

const calculator = {
  add: function (a, b) {
    return a + b;
  },

  sub: function (a, b) {
    return a - b;
  },
  mul: function (a, b) {
    return a * b;
  },
};

console.log(calculator.add(12, 45));
