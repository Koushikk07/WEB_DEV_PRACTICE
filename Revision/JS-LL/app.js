/* let color = "red";

if (color == "red") {
  console.log("You have to Stop !");
} else if (color == "orange") {
  console.log("You have to be ready to move!");
} else {
  console.log("Goooo !");
}
 */

/* let size = "XL";

if (size == "XL") {
  console.log("Price is 250rs");
} else if (size == "L") {
  console.log("Price is 200rs");
} else if (size == "M") {
  console.log("Price is 150rs");
} else if (size == "S") {
  console.log("Price is 100rs");
} else {
  console.log("size not available.");
}
 */

/* let fruit = "apple";

//good string

if (fruit.length > 3 && fruit[0] === "a") {
  console.log("Good String");
} else {
  console.log("HeHE");
}
 */

/* let day = 3; //prompt("Enter the number: ");

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Invalid Number");
} */

//string methods

/* let name = "   Gudapur Koushik   ";

//TRIM() - removes whitespaces form both ends of the string . NOTE: it will not remove in middle

console.log("original:", name, " trim:", name.trim());
console.log(name.toUpperCase());
console.log(name.toLowerCase());
// we can also use one method on another method

console.log(name.trim().toUpperCase()); */
/* 
let str = "StriverA2Z DSA SHEET";

//slice - returns a part of original string as new string

//console.log(str.slice(0, 10));

// replace

console.log(str.replace("StriverA2Z", "Love Barbar"));

//repeat
console.log(str.repeat(5));
 */

//let names = ["Narender", "Koushik", "Aditya", "Sampath", "Ramulu"];
let names = ["Koushik", 21, "Male", 91.01];
for (let i = 0; i < names.length; i++) {
  if (names[i] == "Ramulu") {
    names[i] = "Ram";
  }
  console.log("S.no", i + 1, names[i], typeof names[i]);
}
// we can also access
console.log(names[0][0]);

//Note : String are immutable and arrys are mutable(changes will made)

//array methods : push-add at end , pop-delete at end , unshift-add to start, shift-delete from start and returns it;

// for search for a value (yes or not) arr.includes("red");

//for finding the index of something  arr.indexOf("red"); -- returns the index it not present it returns -1;

//concat -- merge two arrays
//  eg: arr1.concat(arr2);

//reverse an array
// eg:-  arr.reverse();

//slice : copies a portion of an  array
//eg: arr/slice(2 \\ 2,3 ,,,   -3)

//splice :- removes/repplace / add elements

//eg:- colors.splice(start,deleteCount,item0,item1...N);

//sort - arr.sort();

//array References - address in-memory ,,, ->{copying array doesnt create in inmemory just it linkto original}

// while creating array it cant be create a arry with small values-address.
