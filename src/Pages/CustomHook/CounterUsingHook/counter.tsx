import React, { useState } from 'react'
import useCounterHook from './useCounter'
 
function Counter() {
 const {count, decrement,increment,reset } = useCounterHook(5);
 console.log("component render.");
 
 return (
        <>
            <h3>counter : {count}</h3><br />
            <button onClick={increment}>increment</button><br />
            <button onClick={decrement}>decrement</button><br />
            <button onClick={reset}>reset</button><br />
        </>
    )
}

export default Counter
