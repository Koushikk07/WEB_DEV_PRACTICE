import { useState } from "react";

export default function Counter()
{
   //let arr = useState(0);
   //console.log(arr);

   //let [stateVariable, setStateVariable]=useState(10);
   let [count,setCount]=useState(0);

   let incCount = ()=>{
    setCount(count+1);
    console.log(count);

   }
    return(
        <div>
            <h3>Count={count}</h3> {/* but is not updated in UI, only prints in console. we have to re render it . we use state its a built in react obj. any changes in components it will re rendeer it */}
            <button onClick={incCount}>inc</button>
        </div>
    );
}