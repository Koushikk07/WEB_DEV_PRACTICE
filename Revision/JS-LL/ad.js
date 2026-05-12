/* const student = {
  name: "Gudapur Koushik",
  age: 21,
  eng: 95,
  math: 93,
  phy: 97,

  // we know parameters are within scope, even within scope functions can access direct so we  are using this keyword

  //example

  getAvg() {
    //let avg = (eng + math + phy) / 3; it throws an error

    let avg = (this.eng + this.math + this.phy) / 3;
    console.log(avg);
  },
};

console.log(student.getAvg());
 */
//this --> to an object that is executing the current piece of code

// check window in console

/* 
    TRY and CATCH


    try -- a block of code to be tested for errors while it is being executed
    catch -- a block of code to be executed, if an error occurs in the try block
    

*/
/* 
try {
  console.log(a);
} catch {
  console.log("variable not Declared!");
} */

//Miscellaneous topics

//1> Arrow Functions --EX & implicit return (return a single value)

/* const sum = (a, b) => {
  console.log(a + b); // use just =>(a+b);
};

const mul = (a, b) => a * b; // (a*b);

//for explicit --{}
// for implicit --()
sum(5, 11); */

//2. Set Timeout  syntax: setTimeout(funtion,timeout) -- window object funtion

console.log("HI THERE!");

setTimeout(() => {
  console.log("Gudapur Koushik");
}, 4000);

console.log("Welcome to");

//#. set Interval same syntax

setInterval(() => {
  console.log("Gudapur Koushik");
}, 2000);

//prints name every 2 seconds    store it ,, id = and clearinterval(id) to stop it.

//this with arrow functions  (this keywords behalfs diff form obj ) here it use for lexical scope
