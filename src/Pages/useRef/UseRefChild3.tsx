import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const UseRefChild3 = () => {

    const [count,setCount] = useState(0);
    const counterRef = useRef(0);
    
    useEffect(()=> {
        console.log("called once");
        setInterval(function(){
            console.log("inside interval",counterRef.current);
        },1000);

        // const interval = setInterval(function(){
        //     console.log("inside interval",counterRef.current);
        // },1000);

        // return () => {
        //     clearInterval(interval);
        // }
    },[]);

    function handleclick(){
        const newVal = count+1;
        setCount(newVal);
        counterRef.current = newVal;
    }
    console.log("component rendered.");
    
   

    return (
        <>
        <div>
        <h2>UseRefChild3</h2>
        <h5 ref={counterRef}>Count : {count}</h5>
        <Button onClick={handleclick}>Click</Button>
        </div>
        </>
    )
}

export default UseRefChild3;