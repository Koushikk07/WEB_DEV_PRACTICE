/* 
API - Application programming interface

demo;
amazon.in (search bar) => req => amazon api => response => html/css/js => shows up the browser

api asks a waiter in hotel (as per srad.di)

as for now we are just see how to use apis (communicate b/w to two softwares)

apis return the json data

api basically url also know as link(endpoint)



some random API's
catfact.ninja/fact   -- sends random cat facts
boreapi  -- sends an aactivity to do when bored
dog.ceo -- sends dog pics



JSON
Javascript Object Notation  (just a format!) we can also have similiar which is previous(old) XML

*/
let obj = {
  a: undefined,
};
/* 
TESTING API REQUESTS

hOPPSCOTH -> online
POSTMAN  (OLD) We have to download and signup
get - post req testing endpoints
*/

/* 
AJAX

Asynchronous Javascript and XML
(for every actions / api call website will wont reload at every apiu calls)

flow:
js -> req-> api->res(xml/json)->js


Http Verbs

exam;
GET - access/geting the data calling api
POST - sending data with api
Delete
           

Status Codes:
200 - OK
404 - Not Found
400 - Bad Request
500 - Internal Server Error



Add information in URL

https://www.google.com/search?q=harry+porter
                              l      l
                             key   value  


  
  
  
                             ex: ?name=koushik&marks=95
*/

/* 
Http Headers

header-it helps to send adition info in post/get,value
inspect network (type: on google search anything)


*/
/* 
OUR fIRST Request

using Fetch

fetch(url)

*/

let url = "https://catfact.ninja/fact";
fetch(url) //it wont fetch but shows in network page console
  .then((Response) => {
    console.log(Response);
    //Response.json(); //it return the promise and it return the obj to access it
    Response.json().then((data) => {
      console.log(data);
    });
  })
  .catch((err) => {
    console.log("Error-", err);
  });

/* 
  strcutured
fetch(url)
.then((res)=>{
    console.log(res);
    return res.json();   it is returns and accepts
    })
.then((data)=>{
    console.log(data.fact);
    })    
.catch((err)=>{
    console.log(err);
    })
  */

// we can also fetch using async await

async function getFacts() {
  try {
    let res = await fetch(url); //it will pending so we have to await
    let data = await res.json();
    console.log("Fact: ", data.fact);
  } catch (err) {
    console.log("Error-", err);
  } // must you try and catch
}

/* 
Axios 

Library to make HTTP requests

internally uses fetch (compact and easy)

to use 

script src = "https://cdn.jsdeliver.net..."

*/

async function getFacts() {
  try {
    let res = await axios.get(url);
    console.log(res.data.fact);
  } catch (err) {
    console.log("error-", err);
  }
}

//try dog api images

/* 

Axios

sending Headers
*/
const link = "https://icanhazdadjoke.com/";

async function getJokes() {
  const head = { header: { Accept: "application/json" } };
  let res = await axios.get(url, head);
  console.log(res.data); // it will return in html
}

/*
Axios
updating Query Strings


*/

let ur = "http://universities.hipolabs.com/search?name=";

let country = "nepal";
async function getColleges() {
  try {
    await axios.get(ur + country); // this is the something updating query strings
  } catch (err) {
    console.log(err);
  }
}
