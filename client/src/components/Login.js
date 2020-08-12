import React, { createRef } from 'react';
import { BrowserRouter as Route, Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            authenticated: false,
            errorMessage: '',
        };
    }

    loginData = async () => {
        try {
            const result = await fetch('/api/user/login', {
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

            return result;
        } catch (e) {
            console.log(e);
        }
    };
    handleChange = e => {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });
    };

    handleLogin = async () => {
        const result = await this.loginData();
        if (result !== undefined) {
            if (result.status === 200) {
                //Save data to local storage storage
                const tokens = await result.json();
                localStorage.setItem('accessToken', tokens.accessToken);
                localStorage.setItem('refreshToken', tokens.refreshToken);
                localStorage.setItem('score', tokens.score);
                localStorage.setItem('username', this.state.username);

                this.setState({
                    authenticated: true,
                    errorMessage: '',
                });
                this.props.handleLogin();
            } else {
                this.setState({
                    errorMessage: 'Invalid username or password.',
                });
            }
        } else {
            this.setState({
                errorMessage: 'Problem reaching server, try again.',
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
                    <div className="col-12 pb-3 d-flex justify-content-center  failed-text">{this.state.errorMessage}</div>
                </div>
                {this.state.authenticated ? (
                    <div>
                        {' '}
                        <Redirect to="/"></Redirect>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Login;
