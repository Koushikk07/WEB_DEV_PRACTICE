/* let print = ((name)=>{
    console.log(`welcome, ${name}`);

});

console.log("Message");
//console.error("Error message");
console.table([1, 2, 3]);

let num = prompt("Enter Your Age: ");
if(num>=18){
    console.log("You are adult !");

}else{
    console.log("YOU ARE KID BUDDY !");
    console.log("TRY AGAIN NEXT YEAR, BYEE ");
} */

const str = "JavaScript";
str.charAt(3);
str.includes("Script");
str.startsWith("Java");
str.endsWith("pt");
str.replace("Java", "Type");
str.split("");
str.toUpperCase();

const arr = [1, 2, 3, 4, 5, 6, 6, 7];

const reverse_num = (i, n) => {
  if (i > n) return 1;
  console.log(i);
  reverse_num(i+1,n);
};

let n=10
reverse_num(1,n);

