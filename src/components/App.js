import React from 'react';
import Canvas from './Canvas.js';
import HomePage from './HomePage.js';
import Modes from './Modes.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 800,
            height: 600,
            radius: 5,
            radiusChange: 1,
            difficulty: 'easy',
            addCircleTimer: 500,
            mode: 'classic',
        };
    }

    //Use react-router to flip between pages
    //Add Home/Main page
    //Add Settings page to customize difficulty and time

    updateGameState(newGameState) {
        this.setState({
            width: newGameState.width,
            height: newGameState.height,
            radius: newGameState.radius,
            radiusChange: newGameState.radiusChange,
            difficulty: newGameState.difficulty,
        });
    }

    render() {
        return (
            <div>
                {/* <Canvas></Canvas> */}
                <Router>
                    <div>
                        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                            <Link className="navbar-brand" to="/">
                                Home
                            </Link>
                            {/* <Link className="navbar-brand pl-5" to="/play">
                                Play
                            </Link> */}
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
                            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/play">
                                <Canvas mode={this.state.mode} width={this.state.width} height={this.state.height} radius={this.state.radius} radiusChange={this.state.radiusChange} difficulty={this.state.difficultywidth} addCircleTimer={this.state.addCircleTimer}></Canvas>
                            </Route>
                            <Route path="/modes">
                                <Modes updateGameState={this.updateGameState}></Modes>
                            </Route>
                            <Route path="/">
                                <HomePage></HomePage>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
