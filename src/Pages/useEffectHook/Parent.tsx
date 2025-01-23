import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Child from "./Child";

const ParentUseEffect = () => {

    const [toggle,setToggle] = useState(true);

    const toggleHandler = () => setToggle(!toggle);


    useEffect(()=>{
        console.log("toggle click",toggle);
    },[toggle]);
    return (
        <>
        <h2>ParentUseEffect Component</h2> 
        <Button onClick={toggleHandler}>Toggle Component</Button>
        {
            toggle ? <Child /> : <h2>Child componet unmount</h2>
        }
        </>
    )
}

export default ParentUseEffect;