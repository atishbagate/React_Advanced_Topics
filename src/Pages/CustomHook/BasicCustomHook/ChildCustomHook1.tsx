import { useEffect, useState } from "react";
import  useCounterHook from "./useCounterHook";

const ChildCustomHook1 = () => {
   const [num,setNum] = useState(10);
    const  {numEvenOrOdd,sqrtFun} = useCounterHook(num);
     
    useEffect(()=>{ 
        console.log("useEffect..");
        
         numEvenOrOdd;
    },[num]);
    const submitHandler = (e:unknown) => { 
        setNum(e.target.value);
    }
    return (
        <>
            <h4>ChildCustomHook1</h4>
            <p>The below component is the custom hook for calculation.</p>
            <div> 
                    <input value={num} onChange={submitHandler} type="number" id="num"/><br /> 
                    <label htmlFor="num">Number = {num}</label>
                    <p>and its squareRoot is = {sqrtFun(num)} and - {numEvenOrOdd(num)}</p>
            </div>
        </>
    )
}

export default ChildCustomHook1;