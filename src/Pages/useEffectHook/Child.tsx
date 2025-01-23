import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const Child = () => {

    const [count,setCount] = useState(0);
    const ClickHandler = () => {
        // console.log("ClickHandler called");
        setCount((prevValue)=>prevValue + 1);
    }

    // onload
    useEffect(()=>{
        console.log("on load called",count);

        // while unmounting 
        return function () {
            console.log(" unmount called - means component is unmounted from DOM - ",count);
            setCount(0);
        }
    },[]);

    // on the basis of count  
    useEffect(()=>{
        console.log("useEffect called",count);
    },[count]);

    return (
        <>
        <h2>Child Comopent</h2>
        <h4>count is - {count}</h4>
        <Button onClick={ClickHandler}>Click here</Button>
        </>
    )
}

export default Child;