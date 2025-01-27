import { memo, useState } from "react";


const Child = memo(({count})=>{
    console.log("Child render");
    return(
        <>
        <h5>child count - {count}</h5>
        </>
    )
    
});

const Example3 = () => {

    const [parent,setParent]= useState(0);
    const [child,setChild]= useState(0);

    console.log("parent render");
    
    return (
        <>
        <h2>Example 3</h2>
        <h5>parent - {parent}</h5>
        <h5>child - {child}</h5>
        <button onClick={()=> setParent((preValue)=>preValue+1)}>parent Button</button>
        <br />
        <button onClick={()=> setChild((preValue)=>preValue+1)}>child Button</button>
        <Child count={child}/>
        </>
    )
};
export default Example3;