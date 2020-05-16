import React from 'react';
import Canvas from './Classic.js';
import HomePage from './HomePage.js';
import Modes from './Modes.js';
import Footer from './Footer.js';
import Privacy from './Privacy.js';
import Contact from './Contact.js';
import Updates from './Updates';
import ChosenMode from './ChosenMode';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 1200,
            height: 800,
            radius: 50,
            radiusChange: 1,
            maxRadius: 70,
            minRadius: 1,
            difficulty: 'easy',
            addCircleTimer: 1000,
            mode: 'autobalance',
            seconds: 5,
        };
    }

    //Use react-router to flip between pages
    //Add Home/Main page
    //Add Settings page to customize difficulty and time

    updateGameState = newGameState => {
        this.setState({
            // width: newGameState.width,
            // height: newGameState.height,
            radius: newGameState.radius,
            radiusChange: newGameState.radiusChange,
            difficulty: newGameState.difficulty,
            mode: newGameState.mode,
            addCircleTimer: newGameState.addCircleTimer,
            maxRadius: newGameState.maxRadius,
            minRadius: newGameState.minRadius,
        });
    };

    returnGameState = () => {
        let obj = {};
        obj = {
            width: this.state.width,
            height: this.state.height,
            radius: this.state.radius,
            radiusChange: this.state.radiusChange,
            difficulty: this.state.difficulty,
            mode: this.state.mode,
            addCircleTimer: this.state.addCircleTimer,
            maxRadius: this.state.maxRadius,
            minRadius: this.state.minRadius,
            seconds: this.state.seconds,
        };

        return obj;
    };
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <nav className="navbar row navbar-expand-sm navbar-dark bg-dark">
                            <div className="col-9">
                                <Link className="navbar-brand" to="/">
                                    Home
                                </Link>
                                <Link className="navbar-brand" to="/updates">
                                    Updates
                                </Link>
                            </div>
                            <div className="col-3">
                                <Link className="navbar-brand justify-content-end d-flex" to="/">
                                    SignUp
                                </Link>
                            </div>
                            {/* <Link className="navbar-brand pl-5" to="/play">
                                Play
                            </Link> */}
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
                            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/play">
                                <ChosenMode getGameState={this.returnGameState}></ChosenMode>
                            </Route>
                            <Route path="/privacy">
                                <Privacy></Privacy>
                            </Route>
                            <Route path="/modes">
                                <Modes updateGameState={this.updateGameState}></Modes>
                            </Route>
                            <Route path="/contact">
                                <Contact></Contact>
                            </Route>
                            <Route path="/updates">
                                <Updates></Updates>
                            </Route>
                            <Route path="/">
                                <HomePage></HomePage>
                            </Route>
                        </Switch>
                    </div>
                    <Footer></Footer>
                </Router>
            </div>
        );
    }
}

export default App;
