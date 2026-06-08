//JS Call  Stack
// Last in first out (functions) try pen and paper
// it is ds it tracks the funtions calls

/*
BREAKPOINTS 

-- it mostly used for debugging !
it used to track funtions call in browers (keep break points in lines)

inspect-> sources -> breakpoints (add)

***JS is a Single Threaded

(only one execution at a time)
basically line by line execution
but if any waiting like timeout then it execute rest of the code then timeout.
(waiting nature is on brower which is Cpp multi-threaded)

problem -- callback Hell  nesting (callback inside callbacks )
sol: promises , async and wait 


promises -- the promises object represents the eventual completion (or failure ) of an asynchronous operations and
its resulting value..



*/

//promises

function savetoDB(data, success, failure) {
  let internet = Math.floor(Math.random() * 10) + 1;
  if (internet > 4) {
    success(); //console.log("data saved", data);
  } else {
    failure(); //console.log("data not saved");
  }
}

savetoDB(
  "koushik",
  () => {
    console.log("data saved");
  },
  () => {
    console.log("weak connection");
  },
);

/* 
promises is object,

resolve --.success
reject --failure

*/

function savetoDB(data) {
  return new Promise((success, failure) => {
    let net = Math.floor(Math.random() * 10) + 1;

    if (net > 5) {
      success("data saved bro!"); //fulfilled
    } else {
      failure("data not saved"); //rejected
    }
  });
} //try in console

/* 
Promises Methods

1.then()  fulfilled
2.catch() reject -- error



*/

/* let request = savetoDB("gudapur koushik");

request */
savetoDB("gudapur koushik")
  .then(() => {
    console.log("promises are resolved!");
  })
  .then(() => {
    console.log("promises are resolved!"); //promises chaining -- multiple thens
  })
  .then(() => {
    console.log("promises are resolved!");
  })
  .catch(() => {
    console.log("promises are rejected!");
  });
