import React, { createRef } from 'react';
import { BrowserRouter as Link, Redirect } from 'react-router-dom'; //You need link for redirect to work??

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordCheck: '',
            passwordError: '',
            usernameError: '',
            accountCreated: false,
            errorMessage: '',
        };
    }

    //validate user input
    validation = () => {
        const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])');
        const validPass = regex.test(this.state.password);
        let isValidForm = true;

        this.setState({
            passwordError: '',
            usernameError: '',
            errorMessage: '',
        });
        if (this.state.password != this.state.passwordCheck) {
            this.setState({
                passwordError: 'Passwords do not match',
            });

            isValidForm = false;
        }

        if (!validPass) {
            this.setState({
                passwordError: 'Passwords must have 1 lower, upper, and number character',
            });
            isValidForm = false;
        }

        if (this.state.password.length < 8) {
            this.setState({
                passwordError: 'Passwords must be at least 8 characters',
            });
            isValidForm = false;
        }
        if (this.state.password.length > 30) {
            this.setState({
                passwordError: 'Passwords cannot be more than 30 characters',
            });
            isValidForm = false;
        }
        if (this.state.username.length < 3) {
            this.setState({
                usernameError: 'Username must be at least 3 characters',
            });
            isValidForm = false;
        }

        if (this.state.username.length > 20) {
            this.setState({
                usernameError: 'Username can be no more than 20 characters',
            });
            isValidForm = false;
        }

        return isValidForm;
    };
    handleChange = e => {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });
    };

    createAccountData = async () => {
        try {
            let result = await fetch('/api/user/createaccount', {
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
            console.log('error');
        }
    };

    //Create Account
    handleSubmit = async () => {
        event.preventDefault();

        const isValidInput = this.validation();
        if (isValidInput) {
            const result = await this.createAccountData();
            if (result !== undefined) {
                if (result.status === 200) {
                    this.setState({
                        accountCreated: true,
                    });
                }
            } else {
                this.setState({
                    errorMessage: 'Problem reaching server, try again.',
                });
            }
        }
    };

    render() {
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

                        <div className="col-12  d-flex justify-content-center error-text">{this.state.usernameError}</div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-12 d-flex justify-content-center">Password</div>
                        <div className="col-12 d-flex justify-content-center">
                            <label>
                                <input
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    name="password"
                                    required
                                    title="Password needs to have at least one upper, lower, and number character."
                                />
                            </label>
                            <br></br>
                        </div>
                        <div className="col-12  d-flex justify-content-center  error-text"> {this.state.passwordError}</div>
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

                    <div className="col-12 pt-3  d-flex justify-content-center">
                        <button type="button" className="login-button" onClick={this.handleSubmit}>
                            Sign Up
                        </button>
                    </div>
                    <div className="col-12 pb-3 d-flex justify-content-center  failed-text">{this.state.errorMessage}</div>
                </div>
                {this.state.accountCreated ? (
                    <div>
                        {' '}
                        <Redirect to="/login"></Redirect>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default CreateAccount;
