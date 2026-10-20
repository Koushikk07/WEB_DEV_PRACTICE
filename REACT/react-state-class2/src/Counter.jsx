import { useState , useEffect} from "react";

export default function Counter()
{
    let [count,setCount]=useState(0);

    let incCount = () => {
        setCount((curr) => curr + 1);
    };

    useEffect(function sideEffect(){
        console.log("This is the side effect");
    },[count]);  // it only prints for count (dependency)
    return (
        <div>
            <h1>
                counter = {count}
            </h1>
            <button onClick={incCount}>+1</button>
        </div>
    );
}