function useCounterHook(number: number) {
    console.log("number in useCounterHook : ", number);
    
    function numEvenOrOdd(number: number) {
        console.log("inside numToString..",number);
        return number %2 === 0 ? "number is odd" : number %2 !== 0 ? "number is Even" : "not a number";
    }
    const sqrtFun = (num : number) =>  Math.sqrt(num);
    return { 
        numEvenOrOdd,
        sqrtFun
    }
}


export default useCounterHook