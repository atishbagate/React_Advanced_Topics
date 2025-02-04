import { Button } from "@mui/material";
import { useReducer } from "react"
interface State {
    count : number;
    error: string | null;
}
interface Action {
    type: 'increment' | 'decrement';
}
function reducer(state: State, action: Action): State {
    const {type} = action;
    switch (type) {
        case 'increment' : {
            const newNum = state.count + 1;
            const hasError = newNum > 10;
            return {...state,
                count: hasError ? state.count : newNum ,
                error: hasError ? "Count not more than 10 " : null
            };
        }
        case 'decrement' : {
            const newNum = state.count - 1;
            const hasError = newNum < 0;
            return {...state,
                count:hasError ? state.count : newNum,
                error: hasError ? "Count not be less than zero " : null
            };
        }
        default: 
        return state;
    }
}
const ChildUseReducer1 = () => {
    const [state, dispatch] = useReducer(reducer,{count:0,error:null});
    console.log("component render");
    
    return (
        <>
        <br />
            <h2>ChildUseReducer1</h2>
            <div className="">count : {state.count}</div>
            {state.error && <div className="mb-2 text-red-500">{state.error}</div>}
            <br></br>
            <Button  className="" variant="contained" onClick={()=>{dispatch({type: 'increment'})
            }}>Increment</Button>
            <Button variant="contained" onClick={()=>{dispatch({type: 'decrement'})}}>decrement</Button>
        </>
    )
}
export default ChildUseReducer1