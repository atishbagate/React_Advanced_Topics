import { useCallback, useEffect, useState } from "react";
import Child from "./Child"
import { Button } from "@mui/material";

const Parent = () => {

    const [count,setCount] = useState(0);

    // const counter = () => {
    //     setCount((preValue)=> preValue + 1);
    // }
    
    const counterCallback = useCallback(
        ()=>{
            setCount((preValue)=> preValue + 1);
        },[]
    );

    // ex for point 3 
    const addByTenCallback = useCallback(()=>{
        setCount((preValue) => preValue + 10 );
    },[]);
    useEffect(() => {
    console.log("useEffect called.");
    },[addByTenCallback]);
    
    console.log("component rendered.");
    return (
        <>
        <h2>Parent Component</h2>
        <h4>{count}</h4>
        <br /> 
        <Button onClick={counterCallback}>Parent callback Button</Button>
        <Child addByTenCallback={addByTenCallback}  counterCallback={counterCallback}/>

        <br />
        </>
    )
}

export default Parent;