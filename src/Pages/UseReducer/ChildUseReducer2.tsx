import { Button } from "@mui/material";
import { useEffect, useReducer, useRef } from "react";
interface initialState {
    isRunning: boolean;
    time: number;
}
interface Action {
    type: 'start' | 'stop' | 'pause' | 'reset' | 'tick';
}
const ChildUseReducer2 = () => {
    const initialState: initialState = {
        isRunning: false,
        time: 0
    };
    const reducer = (state: initialState, action: Action) => {
        switch (action.type) {
            case 'start':
                return { ...state, isRunning: true };
            case 'stop':
                return { ...state, isRunning: false };
            case 'tick':
                return { ...state, time: state.time + 1 };
            case 'reset':
                return { ...state, time: state.time = 0 };
            default:
                throw new Error();
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const idRef = useRef(0);
    useEffect(() => {
        if (!state.isRunning) {
            return;
        }
        idRef.current = setInterval(() => dispatch({ type: 'tick' }), 1000);
        return () => {
            clearInterval(idRef.current);
            idRef.current = 0;
        };
    }, [state.isRunning]);
    return (
        <>
            <div>

                <h2>ChildUseReducer2</h2>
                <h3>time =  {state.time}</h3>
                <Button variant="contained" className="mr-3 pl-4" onClick={() => dispatch({ type: 'start' })}>Start</Button>
                <Button variant="contained" className="mr-3 pl-4" onClick={() => dispatch({ type: 'tick' })}>Tick</Button>
                <Button variant="contained" className="mr-3 pl-4" onClick={() => dispatch({ type: 'stop' })}>Stop</Button>
                <Button variant="contained" className="mr-3 pl-4" onClick={() => dispatch({ type: 'reset' })}>Reset</Button>
            </div>
        </>
    )
}

export default ChildUseReducer2