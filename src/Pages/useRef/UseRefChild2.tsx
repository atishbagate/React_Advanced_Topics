import { Button } from "@mui/material";
import { DetailedHTMLProps, useRef } from "react";

const UseRefChild2 = () => {
    const firstRef = useRef<DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>();

    function handleClick() {
        console.log("Handle Click");
        
        const element = firstRef.current;
        element.style.color = "red";
    }
    console.log("2nd child component rendered.")
    return (
        <> 
        <div ref={firstRef} className="RefDiv mt-5">
        <p> Use Ref Hook </p>
        <Button onClick={handleClick}>Click to Ref</Button>
        </div>
        <p>In this Example we will target the DOM element and change the color on the basis on onClick.</p>
        </>
    )
}
export default UseRefChild2;