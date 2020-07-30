import React from 'react';
import HomePage from './HomePage.js';
import Modes from './Modes.js';
import Footer from './Footer.js';
import Privacy from './Privacy.js';
import Contact from './Contact.js';
import Updates from './Updates.js';
import ChosenMode from './ChosenMode.js';
import Preview from './Preview.js';
import Login from './Login.js';
import Ranked from './Ranked.js';
import UserAccount from './UserAccount';
import CreateAccount from './CreateAccount.js';
import Leaderboard from './Leaderboard.js';
import 'semantic-ui-css/semantic.min.css';
import DropDownMenu from './DropDownMenu';
import { newToken } from '../apicalls/api.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 900,
            height: 700,
            radius: 1,
            radiusChange: 0.7,
            maxRadius: 50,
            minRadius: 1,
            difficulty: 'medium',
            addCircleTimer: 500,
            mode: 'autobalance',
            seconds: 60,
            isLoggedIn: false,
            username: '',
        };
    }

    componentDidMount = async () => {
        const result = await newToken();
        const name = localStorage.getItem('username');
        if (result !== undefined) {
            if (result.status == 200) {
                this.setState({
                    isLoggedIn: true,
                    username: name,
                });
            }
        } else {
            this.setState({
                isLoggedIn: false,
            });
        }
    };

    updateGameState = newGameState => {
        this.setState({
            width: newGameState.width,
            height: newGameState.height,
            radius: newGameState.radius,
            radiusChange: newGameState.radiusChange,
            difficulty: newGameState.difficulty,
            mode: newGameState.mode,
            addCircleTimer: newGameState.addCircleTimer,
            maxRadius: newGameState.maxRadius,
            minRadius: newGameState.minRadius,
            seconds: newGameState.seconds,
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

    //LOGOUT
    handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            const result = await fetch('http://localhost:3000/api/user/logout', {
                method: 'delete',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: refreshToken,
                }),
            });
        } catch (e) {
            console.log('error');
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');

        this.setState({
            isLoggedIn: false,
        });
    };

    //SET STATE LOGIN
    handleLogin = () => {
        this.setState({
            isLoggedIn: true,
            username: localStorage.getItem('username'),
        });
    };

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <nav className="navbar row navbar-expand-sm navbar-dark bg-dark main-navbar">
                            <div className="col-9">
                                <Link className="navbar-brand" to="/">
                                    Home
                                </Link>
                                <Link className="navbar-brand" to="/updates">
                                    Updates
                                </Link>
                                <Link className="navbar-brand" to="/leaderboard">
                                    Leaderboard
                                </Link>
                            </div>
                            {this.state.isLoggedIn && (
                                <div className="dropdown col-3 justify-content-end d-flex">
                                    <DropDownMenu handleLogout={this.handleLogout} username={this.state.username}></DropDownMenu>
                                </div>
                            )}
                            {!this.state.isLoggedIn && (
                                <div className="col-3 justify-content-end d-flex">
                                    <Link className="navbar-brand" to="/login">
                                        Login
                                    </Link>
                                </div>
                            )}
                        </nav>

                        <Switch>
                            <Route path="/play">
                                <ChosenMode getGameState={this.returnGameState}></ChosenMode>
                            </Route>
                            <Route path="/privacy">
                                <Privacy />
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
                            <Route path="/login">
                                <div className="background">
                                    <Preview getGameState={this.returnGameState}></Preview>
                                </div>
                                <Login handleLogin={this.handleLogin}></Login>
                            </Route>
                            <Route path="/createaccount">
                                <div className="background">
                                    <Preview getGameState={this.returnGameState}></Preview>
                                </div>
                                <CreateAccount></CreateAccount>
                            </Route>
                            <Route path="/useraccount">
                                {/* <div className="background">
                                    <Preview getGameState={this.returnGameState}></Preview>
                                </div> */}
                                <UserAccount></UserAccount>
                            </Route>
                            <Route path="/leaderboard">
                                {/* <div className="background">
                                    <Preview getGameState={this.returnGameState}></Preview>
                                </div> */}
                                <Leaderboard></Leaderboard>
                            </Route>
                            <Route path="/ranked">
                                <Ranked></Ranked>
                            </Route>
                            <Route path="/">
                                <div className="background">
                                    <Preview getGameState={this.returnGameState}></Preview>
                                </div>
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
