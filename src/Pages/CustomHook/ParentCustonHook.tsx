import ChildCustomHook from "./APICallingHook/ChildCustomHook";
import useApiHook from "./APICallingHook/useApiHook";
import ChildCustomHook1 from "./BasicCustomHook/ChildCustomHook1";
import Counter from "./CounterUsingHook/counter";

const ParentCustomHok = () => {
    return (
        <>
        <h3>ParentCustomHok</h3>
        {/* <ChildCustomHook1 /> */}
        <ChildCustomHook />
        {/* <Counter /> */} 
        </>
    )
}
export default ParentCustomHok;