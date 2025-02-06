import React from "react";

class ComponentDidMount extends React.Component {

    constructor(props) {
        super(props);
        console.log("1 Constructor executed.");

        this.state = {
            count: 0
        };
    }

    static getDerivedStateFromProps(props, state) {
        console.log("2 getDerivedStateFromProps executed."); 
        return null;
    }

    componentDidMount() {
        console.log("4 ComponentDidMount executed.");

    }

    incrementCount = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    };


    render() {
        console.log("3 Render Executed.");

        return (
            <div>
                <h1>Counter</h1>
                <p>Count: {this.state.count}</p>
                <button onClick={this.incrementCount}>Add</button>
                {/* <div>

                    <h3>Theory : </h3>
                    <p>The mounting phase is when a new component is created and it is
                        inserted into the DOM or, in simple words, when the actual life of a
                        React component begins. This happens once, and is often called
                        “initial render.” To get through this phase, four lifecycle methods
                        are called: constructor, static getDerivedStateFromProps, render,
                        and componentDidMount</p>
                    <br />
                    COMPONENT MOUNTING PHASE:<br />
                    CONSTRUCTOR()<br />
                    GETDERIVEDSTATEFROMPROPS()<br />
                    RENDER()<br />
                    COMPONENTDIDMOUNT()<br />

                    <h5>THE CONSTRUCTOR() LIFECYCLE METHOD : </h5>
                    <p> The constructor method is the very first method called
                        during the mounting phase. This method is mostly used for
                        initializing the state of the component and binding the
                        event-handler methods which will be used within the
                        component. The constructor method is called when the
                        component is initiated, but before it’s rendered. Note that
                        if you want any state in your component, it’s important
                        you call the super(props) function with the props as an
                        argument passed to it within the constructor.</p>
                    <br />

                    <h5>GETDERIVEDSTATEFROMPROPS() METHOD : </h5>
                    <p>  After initializing, the next function that is called is static
                        getDerivedStateFromProps(). This method allows a
                        component to update its states based on changes to its
                        props. It is very rarely used and should be used with
                        caution as it can cause many errors. The general rule as a
                        beginner, you probably don’t need it and should avoid
                        using it.
                        This method is used to modify the state value with any
                        props value. The method static
                        getDerivedStateFromProps() accepts two arguments:
                        props and state, and returns an object, or null if no change
                        is needed. These values are passed directly to the method,
                        so there’s no need for it to have access to the instance of
                        the class (or any other part of the class) and thus is
                        considered a static method.</p>
                    <br />

                    <h5>THE RENDER() METHOD : </h5>
                    <p> The render() method is the only required method in a
                        class-based React component. It runs after
                        getDerivedStateFromProps() and creates the HTML (as
                        JSX) that gets displayed on the screen.
                        The render() method usually returns JSX, but it can also
                        return other things. You can’t : Change the state.
                        Interact directly with the browser.
                        Perform side effects like HTTP requests. </p>
                    <br />

                    <h5>THE COMPONENTDIDMOUNT() METHOD : </h5>
                    <p> The componentDidMount() method runs right after a
                        component is rendered for the first time (after the first
                        render() cycle). It’s commonly used to:
                        Make network requests like API calls.
                        Set up subscriptions or other features that need the
                        DOM.
                        This method is ideal for initializing anything that requires
                        the component to be fully loaded in the DOM. </p>
                    <br />
                </div> */}
            </div>
        )
    }

}

export default ComponentDidMount;