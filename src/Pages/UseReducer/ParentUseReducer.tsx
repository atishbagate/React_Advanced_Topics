import ChildUseReducer1 from "./ChildUseReducer1"
import ChildUseReducer2 from "./ChildUseReducer2"

const ParentUseReducer = () => {

    return (
        <>
            <h2>ParentUseReducer</h2>
            <p>The useReducer(reducer, initialState)
                 hook accepts 2 arguments: the reducer function and the initial state.
                  The hook then returns an array of 2 items: the current state and the dispatch function.</p>
            <p>const [state, dispatch] = useReducer(reducer, initialState);</p>

            <p>
            The useReducer hook is an alternative to useState for managing complex state logic in React components. It is particularly useful when:
            ✅ The next state depends on the previous state.
            ✅ The state involves multiple sub-values.
            ✅ There are multiple ways to update the state (e.g., actions in Redux).
            </p>
            {/* <ChildUseReducer1 /> */}
            <br></br>
            <ChildUseReducer2 />
        </>
    )
}

export default ParentUseReducer