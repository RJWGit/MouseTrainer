import React, { createRef } from 'react';
import CreateAccount from './CreateAccount.js';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            authorized: false,
            validUser: true,
        };
    }

    handleChange = e => {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });
    };

    postData = async () => {
        try {
            let result = await fetch('https://webhook.site/eda25444-b10a-4d50-afda-1b59fc5cb529', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    Accept: 'application.json',
                },
                body: JSON.stringify({
                    key1: 'login',
                }),
            });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    };

    handleLogin = () => {
        this.setState({
            authorized: false,
            validUser: false,
        });
    };

    render() {
        return (
            <div className="container login-page-container">
                <div className="row justify-content-md-center">
                    <div className="col-12 pb-5 pt-3 d-flex justify-content-center">
                        <h1>Login</h1>
                    </div>

                    <div className="row justify-content-md-center">
                        <div className="col-12 d-flex justify-content-center">Username</div>
                        <div className="col-12 pb-3 d-flex justify-content-center">
                            <label>
                                <input value={this.state.username} onChange={this.handleChange} name="username" />
                            </label>
                            <br></br>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-12 d-flex justify-content-center">Password</div>
                        <div className="col-12 pb-3 d-flex justify-content-center">
                            <label>
                                <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                            </label>
                            <br></br>
                        </div>
                    </div>

                    <div className="col-12 pb-3 d-flex justify-content-center">
                        <button type="button" className="login-button" onClick={this.handleLogin}>
                            Login
                        </button>
                    </div>
                    <div className="col-12 pb-3 d-flex justify-content-center">
                        <Link to="/createaccount">Create Account</Link>
                    </div>
                    <div className="col-12 pb-3 d-flex justify-content-center  failed-text">
                        {this.state.validUser ? '' : 'You have entered invalid username and password. Please try again.'}
                    </div>
                </div>
                {this.state.authorized ? (
                    <div>
                        {' '}
                        <Redirect to="/"></Redirect>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

export default Login;
