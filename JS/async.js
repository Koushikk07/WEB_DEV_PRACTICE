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
  console;
}
