import {useState} from "react";

function useCounterHook(initvalue = 0){
    console.log("useCounter Hook called..");
    
    const [count,setCount] = useState(initvalue);

    const increment = () => setCount(count+1);
    const decrement = () => setCount(count-1);
    const reset = () => setCount(initvalue);

    return {increment,decrement,reset,count};
}
export default useCounterHook;