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
import CreateAccount from './CreateAccount.js';
// import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth * 0.5,
            height: window.innerHeight * 0.7,
            radius: 1,
            radiusChange: 0.7,
            maxRadius: 50,
            minRadius: 1,
            difficulty: 'medium',
            addCircleTimer: 500,
            mode: 'autobalance',
            seconds: 5,
            isLoggedIn: false,
            username: '',
        };
    }

    componentDidMount = async () => {
        const result = await this.newToken();
        const name = localStorage.getItem('username');

        if (result != null) {
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

    //Example API to access restricted API
    testAPI = async () => {
        const accessToken = await localStorage.getItem('accessToken');
        try {
            const result = await fetch('http://localhost:3000/api/user/testlogin', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'BEAR ' + accessToken,
                },
            });
            if (result.status !== 200) {
                const newToken = await this.newToken();
                if (newToken.status == 200) {
                    this.testAPI();
                }
            }
        } catch (e) {
            console.log('error');
        }
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

    //GENERATE NEW ACCESS TOKEN
    newToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            const result = await fetch('http://localhost:3000/api/user/token', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: refreshToken,
                }),
            });

            //Save tokens to local storage
            const tokens = await result.json();
            localStorage.setItem('accessToken', tokens.accessToken);

            return result;
        } catch (e) {
            console.log('error');
        }
    };

    //SET STATE LOGIN
    handleLogin = () => {
        this.setState({
            isLoggedIn: true,
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
                                <Link className="navbar-brand" onClick={this.testAPI} to="/">
                                    Test
                                </Link>
                            </div>
                            {this.state.isLoggedIn && (
                                <div className="dropdown col-3 justify-content-end d-flex">
                                    <Link className="navbar-brand" onClick={this.handleLogout} to="/">
                                        {this.state.username}
                                    </Link>
                                    {/* <Dropdown trigger={trigger} pointing="top left" icon={null}>
                                        <Dropdown.Menu>
                                            <Dropdown.Item text="Account" icon="user" as={Link} to="/accounts" />
                                            <Dropdown.Item text="Settings" icon="settings" as={Link} to="/settings" />
                                            <Dropdown.Item text="Sign Out" icon="sign out" as={Link} to="/sign-out" />
                                        </Dropdown.Menu>
                                    </Dropdown> */}
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
