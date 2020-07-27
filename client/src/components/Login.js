import React, { createRef } from 'react';
import CreateAccount from './CreateAccount.js';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            authenticated: false,
            validUser: true,
        };
    }

    postData = async () => {
        try {
            const result = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                }),
            });

            //Save tokens to local storage
            const tokens = await result.json();
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            return result;
        } catch (e) {
            console.log('error');
        }
    };
    handleChange = e => {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });
    };

    handleLogin = async () => {
        const result = await this.postData();

        if (result.status === 200) {
            localStorage.setItem('username', this.state.username);

            this.setState({
                authenticated: true,
            });
            this.props.handleLogin();
        } else {
            this.setState({
                validUser: false,
            });
        }
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
                {this.state.authenticated ? (
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
