/* for (let i = 0; i < 10; i++) {
  console.log(i, "Gudapur Koushik");
} */

/* for (let i = 10; 
    i > 0;
     --i) {
  console.log(i);
} */

//printing all odd numbers

/* console.log("List of odd numbers between 1 to 15: ");
for (let i = 1; i <= 15; i++) {
  if (i % 2 != 0) {
    console.log(i);
  }
} */

// printing all even numbers:

/* console.log("List of even numbers between 2 to 10: ");
for (let i = 2; i <= 10; i++) {
  if (i % 2 == 0) console.log(i);
} */

//print multiplcation table for 5

/* console.log("Multiplication Table of 5");
for (let i = 1; i <= 10; i++) {
  console.log("5 x", i, "=", 5 * i);
} */

//Nested loops

/* for (let i = 1; i <= 3; i++) {
  console.log(i, "i");
  for (let j = 1; j <= 3; j++) {
    console.log(j, "j");
  }
} */

//new for of loop   and we can also use for nested loop

let fruits = ["mango", "apple", "banana", "litchi", "orange", "grape"];

for (it of fruits) {
  console.log(it);
}

//for(element of collection)

for (char of "Gudapur Koushik") {
  console.log(char);
}
