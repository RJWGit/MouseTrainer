import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordCheck: '',
            passwordValid: true,
            usernameValid: true,
            accountCreated: false,
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

    checkPassword = () => {
        if (this.state.password != this.state.passwordCheck) {
            this.setState({
                passwordValid: false,
            });
        } else {
            this.setState({
                passwordValid: true,
            });
        }
    };

    //check database if username already exists
    checkUsername = () => {};

    handleSubmit = async () => {
        event.preventDefault();

        await this.checkPassword();
        // this.checkUsername();

        if (this.state.passwordValid && this.state.usernameValid) {
            //Create account

            this.setState({
                accountCreated: true,
            });
        }
    };

    render() {
        if (!this.state.accountCreated) {
            return (
                <div className="container login-page-container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 pb-5 pt-3 d-flex justify-content-center">
                            <h1>Create Account</h1>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col-12  d-flex justify-content-center">Username</div>
                            <div className="col-12  d-flex justify-content-center">
                                <label>
                                    <input value={this.state.username} onChange={this.handleChange} name="username" />
                                </label>
                                <br></br>
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col-12 d-flex justify-content-center">Password</div>
                            <div className="col-12 d-flex justify-content-center">
                                <label>
                                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                                </label>
                                <br></br>
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col-12 d-flex justify-content-center">Confirm Password</div>
                            <div className="col-12 d-flex justify-content-center">
                                <label>
                                    <input type="password" value={this.state.passwordCheck} onChange={this.handleChange} name="passwordCheck" />
                                </label>
                                <br></br>
                            </div>
                        </div>

                        <div className="col-12 pt-3 pb-3 d-flex justify-content-center">
                            <p>Password needs to be atleast 8 characters</p>
                        </div>

                        <div className="col-12  d-flex justify-content-center">
                            <button type="button" className="login-button" onClick={this.handleSubmit}>
                                Sign Up
                            </button>
                        </div>
                        <div className="col-12 pb-3 d-flex justify-content-center failed-text">
                            {this.state.passwordValid ? '' : 'Passwords do not match'}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Redirect to="/login"></Redirect>
                </div>
            );
        }
    }
}

export default CreateAccount;
