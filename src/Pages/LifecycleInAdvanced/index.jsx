import React from 'react'
import ComponentDidMount from './mountingPhase'


function Index() {
    return (
        <>
            <h2>This is the Topic for React Lifecycle detailed topic.</h2>
            <p>In React, components have a lifecycle that consists of different
            phases. Each phase has a set of lifecycle methods that are called at
            specific points in the component's lifecycle. These methods allow
            you to control the component's behavior and perform specific
            actions at different stages of its lifecycle
            A component's lifecycle has three main phases: 
            the Mounting Phase
            the Updating Phase and 
            the Unmounting Phase</p>
            
            <ComponentDidMount />
        </>
    )
}

export default Index
