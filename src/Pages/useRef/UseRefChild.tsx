import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const UseRefChild = () => {


    const [count,setCount] = useState(0);
    const countRef = useRef(0);

    const handleIncrement = () => {
        setCount(count + 1);
        countRef.current++;

        console.log("State: " ,count);
        console.log("ref: ",countRef.current);
    }
    console.log("component render");

    return (
        <>
            <h3 className="mt-5">useRefChild Component</h3>
            <h5>Count : {count}</h5>
            <h5>Ref : {countRef.current}</h5>
            <Button onClick={handleIncrement}>Increment</Button>

            <p>Explaination: </p>
            <p>in above counter. count is printing log 0 bcoz to show the ref value it need to render. </p>
            <p>useRef showing proper current value bcoz it does not require render the component for print the count.</p>
            <p>useRef does change value without re render the component</p>
        </>
    )
}

export default UseRefChild;