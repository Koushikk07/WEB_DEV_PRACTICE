//JS object literals -- used to store keyed collection & complex entities

//objects are a collection of properties
/* 
let nalgonda = {
  lat: "243435 N", //random stuff
  long: "345345 E", // random stuff
  state: "telangana",
  lang: "telugu",
};

console.log(nalgonda);
console.log(nalgonda.lang); */

//delete nalgonda.lang

// OBJECTS OF OBJECTS
//-- storing information of multiple students

/* const classInfo = {
  koushik: {
    rollno: "52",
    branch: "CSE",
    mobileno: "799340XXXX",
    grade: "A",
  },
  narender: {
    rollno: "01",
    branch: "CSE",
    mobileno: "911340XXXX",
    grade: "B+",
  },
  aditya: {
    rollno: "58",
    branch: "CSE",
    mobileno: "909340XXXX",
    grade: "A+",
  },
};

console.log(classInfo);
console.log(classInfo.aditya.grade);

classInfo.narender.grade = "A++";

delete classInfo.koushik.grade;

console.log(classInfo); */

//we cna also use obj as like arrays

/* let classinfo = [
  {
    name: "Gudapur Koushik",
    rollno: "52",
    branch: "CSE",
    mobileno: "799340XXXX",
    grade: "A",
  },
  {
    name: "Tupakula Narender",
    rollno: "01",
    branch: "CSE",
    mobileno: "911340XXXX",
    grade: "B+",
  },
  {
    name: "Butharaju Aditya",
    rollno: "58",
    branch: "CSE",
    mobileno: "909340XXXX",
    grade: "A+",
  },
];

console.log(classinfo);
console.log(classinfo[0]);
console.log(classinfo[0].name); */

//Math objects
/*
 properties
Math.E
Math.PI

Methods

Math.abs(n)
Math.pow(a,b)
Math.floor(n)
Math.ceil(n)
Math.random()



*/

console.log(Math.PI); // to check indetail methods ,type Math in console in any browser
console.log(Math.abs(-10.14)); // convert negative into positive (pos remains same)
console.log(Math.pow(2, 5));
console.log(Math.floor(7.6)); // lower value for postive and neg (for neg num is high)
console.log(Math.ceil(7.6)); //same as floor ,but larger
console.log(Math.floor(Math.random() * 100) + 1);
