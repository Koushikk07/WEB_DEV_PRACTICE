function doSomething()
{
    console.log("Button is Clicked....!")
}

function handleOver()
{
    console.log("Hovered___!")
}

function DoubleClicked()
{
    console.log("Double clicked Bro....!")
}

function handleFormSubmit(event)
{
    event.preventDefault();
    console.log("Form was Submitted..!")
}
export default function Button(){
    return(
        <div>
            <button onClick={doSomething} onMouseOver={handleOver} onDoubleClick={DoubleClicked}>click</button>
         <form onSubmit={handleFormSubmit}>
            <button>Submit</button>
         </form>
         
         </div>
    );
}