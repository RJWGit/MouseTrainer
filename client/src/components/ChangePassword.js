import React, { createRef } from 'react';
import { newToken } from '../apicalls/api.js';
import { BrowserRouter as Link, Redirect } from 'react-router-dom'; //You need link for redirect to work??

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordCheck: '',
            passwordError: '',
            errorMessage: '',
            success: false,
        };
    }

    handleChange = e => {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });
    };

    validation = () => {
        const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])');
        const validPass = regex.test(this.state.password);
        let isValidForm = true;

        this.setState({
            passwordError: '',
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

        return isValidForm;
    };
    changePasswordData = async () => {
        await newToken(); //Check if need to generate new access token
        const accessToken = localStorage.getItem('accessToken');
        try {
            let result = await fetch('/api/user/changepassword', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'BEAR ' + accessToken,
                },
                body: JSON.stringify({
                    password: this.state.password,
                }),
            });

            return result;
        } catch (e) {
            this.setState({
                errorMessage: 'Problem reaching server, try again.',
            });
        }
    };

    handleSubmit = async () => {
        event.preventDefault();

        const isValidForm = this.validation();
        if (isValidForm) {
            const result = await this.changePasswordData();
            if (result !== undefined) {
                if (result.status == 200) {
                    this.props.handleLogout();

                    this.setState({
                        success: true,
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
                        <h1>Change Password</h1>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-12  d-flex justify-content-center"> New Password</div>
                        <div className="col-12  d-flex justify-content-center">
                            <label>
                                <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
                            </label>
                            <br></br>
                        </div>
                        <div className="col-12  d-flex justify-content-center error-text">{this.state.passwordError}</div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-12  d-flex justify-content-center"> Reenter New Password</div>
                        <div className="col-12  d-flex justify-content-center">
                            <label>
                                <input type="password" value={this.state.confirmPassword} onChange={this.handleChange} name="passwordCheck" />
                            </label>
                            <br></br>
                        </div>
                    </div>
                    <div className="col-12 pt-5 d-flex justify-content-center">
                        <button type="button" className="login-button" onClick={this.handleSubmit}>
                            Confirm
                        </button>
                    </div>
                    <a href="#" className="col-12 pt-5 d-flex justify-content-center" onClick={this.props.toggle}>
                        Go back
                    </a>
                    <div className="col-12  d-flex justify-content-center error-text">{this.state.errorMessage}</div>
                </div>
                {this.state.success ? (
                    <div>
                        {' '}
                        <Redirect to="/login"></Redirect>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default ChangePassword;
