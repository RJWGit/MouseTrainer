import React, { createRef } from 'react';
import { newToken } from '../apicalls/api.js';
import { BrowserRouter as Link, Redirect } from 'react-router-dom'; //You need link for redirect to work??

class ChangeUsername extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            confirmUsername: '',
            usernameError: '',
            errorMessage: '',
            success: false,
        };
    }

    validation = () => {
        let isValidForm = true;

        this.setState({
            usernameError: '',
        });

        if (this.state.username != this.state.confirmUsername) {
            this.setState({
                usernameError: 'Usernames do not match',
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

    changeUsernameData = async () => {
        await newToken(); //Check if need to generate new access token
        const accessToken = localStorage.getItem('accessToken');

        try {
            let result = await fetch('/api/user/changeusername', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'BEAR ' + accessToken,
                },
                body: JSON.stringify({
                    username: this.state.username,
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

        const isValidInput = this.validation();

        if (isValidInput) {
            const result = await this.changeUsernameData();

            if (result !== undefined) {
                console.log(result.status);
                if (result.status === 200) {
                    this.props.handleLogout();

                    this.setState({
                        success: true,
                        errorMessage: '',
                    });
                } else {
                    this.setState({
                        errorMessage: 'Username maybe already taken',
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
                        <h1>Change Username</h1>
                    </div>

                    <div className="row justify-content-md-center">
                        <div className="col-12  d-flex justify-content-center"> New Username</div>
                        <div className="col-12  d-flex justify-content-center">
                            <label>
                                <input value={this.state.username} onChange={this.handleChange} name="username" />
                            </label>
                            <br></br>
                        </div>
                        <div className="col-12  d-flex justify-content-center error-text">{this.state.usernameError}</div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-12  d-flex justify-content-center"> Reenter New Username</div>
                        <div className="col-12  d-flex justify-content-center">
                            <label>
                                <input value={this.state.confirmUsername} onChange={this.handleChange} name="confirmUsername" />
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

export default ChangeUsername;
