import { useCallback, useEffect, useState } from "react";
import Child from "./Child"
import { Button } from "@mui/material";
import Example2 from "./example2";
import Example3 from "./example3";

const Parent = () => {

    const [count,setCount] = useState(0);
    const [reloadUI,setReloadUI] = useState(false);

    const counter = () => {
        setCount((preValue)=> preValue + 1);
    }
    
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
    console.log("addByTenCallback useEffect called.");
    },[addByTenCallback]);
    
    // function to reload data.
    const reladUIHandler = useCallback(()=>{ 
        console.log("UI relaod callback executed.")
    },[reloadUI])
    
    
    console.log("component rendered.");
    return (
        <>
        <h2>Parent Component</h2>
        <h4>{count}</h4>
        <br /> 
        <Button onClick={counter}>Parent callback Button</Button>
        <Child addByTenCallback={addByTenCallback}  counterCallback={counterCallback}/>

        <br />

        {/* <Example2 /> */}
        <Example3 />
        </>
    )
}

export default Parent;