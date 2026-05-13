//forEach  //arr.forEach(some funtion defor name);
let arr = [1, 2, 3, 4, 5, 66, 7, 8];

function print(el) {
  console.log(el);
}

//arr.forEach(print); //or arr.foreach(funciton(el){console.log(el)})

//map -- used to make changes in element while iteration and stoe in new array with same size

let Newarr = arr.map(function (el) {
  return el * 2;
});

//Newarr.forEach(print);
//Newarr.sort();
//Newarr.forEach(print);

//Filter -- called if true store the el, if false skip the el

let even = arr.filter((num) => num % 2 == 0);

//even.forEach(print);

//EVERY -- return true if ""Every element of array gives true"" for some function.Else return false.

console.log(arr.every((el) => el % 2 == 0));

//Reduce -- reduces the array to a single value

//syntax: arr.reduce(reducer function with 2 variables for (accumulator,element));

console.log(arr.reduce((res, el) => res + el));

//assigning default value to the arguments

function func(a, b = 3) {
  return a + b;
}

//Spread  -- expands an iterable into a multiple values

console.log(...arr);
console.log(..."gudapur koushik");
Math.min(...arr);

let nums = [...arr, ...Newarr];

//spread for object literals

const data = {
  name: "Gudapur Koushik",
  password: "KBG@1986",
  emai: "gudapurkoushik52@gmail.com",
};

let det = { ...data, id: 12 };

console.log(det);

//let arr=[1,2,3,4,5,6];

let obj1 = { ...arr };
console.log(obj1);
