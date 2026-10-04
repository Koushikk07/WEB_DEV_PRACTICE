export default function Counter()
{
    let count=0;
    function incCount()
    {
        count++;
        console.log(count)
    }

    return(
        <div>
            <h3>Count={count}</h3> {/* but is not updated in UI, only prints in console. we have to re render it . we use state its a built in react obj. any changes in components it will re rendeer it */}
            <button onClick={incCount}>inc</button>
        </div>
    );
}