import React from 'react';
import Canvas from './Canvas.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //Use react-router to flip between pages
    //Add Home/Main page
    //Add Settings page to customize difficulty and time
    render() {
        return (
            <div>
                <Canvas></Canvas>
            </div>
        );
    }
}

export default App;
