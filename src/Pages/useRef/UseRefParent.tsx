
import UseRefChild from './UseRefChild';
import UseRefChild2 from './UseRefChild2';
import UseRefChild3 from './UseRefChild3';
const UseRefParent = () => {

    return (
        <>
        <h2>Use Ref Parent Component.</h2>
        <p>this hooks use to change the value which does not need to render a component.
            basic difference between useState and useRef is that useRef does not need to render a component. 
            and useState renders the component.
        </p>
        {/* <UseRefChild /> */}
        {/* <UseRefChild2 /> */}
        {/* <UseRefChild3 /> */}
        </>
    )
}

export default UseRefParent