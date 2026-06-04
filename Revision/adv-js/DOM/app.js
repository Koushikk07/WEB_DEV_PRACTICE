/* 
SELECTING ELEMENTS

getElementById

--returns the elements as an object or null (if not found)


getelementbyid,
 tagname,
 class,
 querySelector,

innerText = shows the visible text contained in a mode
textContent = shows all full text
innerHTML = shows the full markup

*** Manipulating Attributes
-> obj.getAttribute(attr)  getters
-> obj.setAttribute(attr,val) setters   (disadv -- only set one class at a time so prefers classlist)

*** Manipulating Style

-> obj.style;
ex: img = doc...
img.style.color = 'red';

--> USING classList
obj.classList

classList.add()   to add new classes
classList.remove()   to remove classes
classList.contains()   to check if class exists
classList.toggle()   to toggle btw add and remove


NAVIGATION  -- move from element to element

3 ->
1. parentElement
2. children || [1].previousele...
3.previousElementSibling / nextElementSibling

childElementCount -- return the count of children.


*** Adding Elements

document.createElement('p');  it creates an new p to set p let var = .. , 
next,
p.innerText = "text";
var.appendchild(h1) h1 is nested parent , it added as child in h1; inserted in last;

> appendChild(element)
> append(element)
> prepend(element)
> insertAdjacent(where,element)  check indetail in mdn web docs_

to remove elements
> removeChild(element)
> remove(element)


*** DOM Events

def- Events are signals that something has occured.  (user inputs/actions)

button onclick=" JS CODE like ex console.alert(button clicked)"

onclick - when an element is clicked
onmouseenter - when mouse enters an element

ex.code

let btn  = doc.qs('button');
btn.onclick = funtion(){
...}

or or function(){..}
btn.onclick = function();

EVENT LISTENER

addEventListener

element . addEventListener(event,callback)

btn.addEventListener("click",function(){  event--click drag keyboard key
console.log...})  

disadv in onclick it can only use max one function(callback) refer to website mdn

Event L for Elements

we can also use EL on elements
let p = doc..p
p.addEvL("dblclick",function(){
console.log("Hold on buddy" ,, )})
this.stylle.color= ..



this in EL

when this is used in a callback of event hander of something, it refer to that something


*** Keyboard Events

event--keydown  check in mdn  code="name" key="sybl"  can get by event.code || .key


FORM events

add in action  ,,event is the action



event.preventDefault()  


EXTRACTING FORM DATA


if event is submit make the data to be store or extracted!


MORE events

change event

def- The change event occurs when the value of an ele has been changed (only works on input, textare selet)

input event

def-the input event fires when the value of input select textarea has been changed

*/

document.getElementById("mainImg");
