//Async -- it return promise
// returneed promised , we apply method stuff on it

async function greet() {
  // return "hi"; even without this it return a promise

  return "hello";
}
/* 
funtion   1.normal - p: fulfilled and returns values;
          2.error - p:rejected return the error

          we can also throw error: 
          throw "random error";


*/

greet()
  .then((result) => {
    console.log("Promise was resolved");
    console.log("result was: ", result);
  })
  .catch((err) => {
    console.log("Promise was rejected with err: ", err);
  });

/* 
  
  
  we can also make a arrow funtion into async
  let hello = async ()=>{
    }
  
  */

/* 
    
    AWAIT Keyword
    
    pauses the execution of its surrounding async function until the promises is settled (resolved or rejected)


    */

function getNum() {
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      let num = Math.floor(Math.random() * 10) + 1;
      return num;
    }, 1000);
  }); //console.log(5);
}

async function demo() {
  await getNum(); // until this funtion not return , other function will not execute
  getNum();
  getNum();
}

/* 
we know funtion demo ()
{
change color("red",1000); //1 sec delay
change color("green",1000); //1 sec delay
change color("orange",1000); //1 sec delay
change color("red",1000); //1 sec delay
change color("blue",1000); //1 sec delay
but it directly shows blue in h1. 

}

*/

h1 = document.querySelector("h1");

function changeColor(color, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // for reject -- let num = math.floor .. if num >3 reject("promise rejected")
      h1.style.color = color;
      console.log(`color changed to ${color}!`);
      resolve("color changed!");
    }, delay);
  });
}

async function demo() {
  await changeColor("red", 1000);
  await changeColor("green", 1000);
  await changeColor("yellow", 1000);
  await changeColor("blue", 1000);
  await changeColor("pink", 1000);
  await changeColor("grey", 1000);
}

// now it prints each color for 1sec then next color will.

//this case has no error
// what if any errors
// if any of function is rejected like yellow func rest of the functionw will not executed

/* 
Handing Rejections

try{
....await   this will make sure if one will fail rest will execute

}catch(err)
{
console.log(err);
}
*/
