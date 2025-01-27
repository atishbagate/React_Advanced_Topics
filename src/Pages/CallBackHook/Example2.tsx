import React, { useCallback, useMemo, useState } from "react";

const Child2 = React.memo(({incrementHandle}) => {
    console.log("child component render.");
    return (
        <>
            <h2>Child Component.</h2>
            <button onClick={incrementHandle}>increment Button</button> 
        </>
    )
});

const Example2 = () => {

    console.log("parent component render.");
    const [count, setCount] = useState(1); 
     
    const incrementHandler = useCallback(()=>{
        setCount((prev)=>prev+1);
    },[]);

    return (
        <>
            <h1>Example 2 </h1>
            <h3>parent count : {count}</h3>
            <Child2 incrementHandle={incrementHandler}/>
        </>
    )

}
export default Example2;