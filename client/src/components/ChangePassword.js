import React, { createRef } from 'react';
import { newToken } from '../apicalls/api.js';
import { BrowserRouter as Link, Redirect } from 'react-router-dom'; //You need link for redirect to work??

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            confirmUsername: '',
            success: false,
        };
    }

    handleChange = e => {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });
    };

    changePasswordData = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            let result = await fetch('http://localhost:3000/api/user/changepassword', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'BEAR ' + accessToken,
                },
                body: JSON.stringify({
                    password: this.state.username,
                }),
            });

            console.log('a');
            if (result.status !== 200) {
                console.log('b');
                const token = await newToken();
                if (token.status == 200) {
                    return await this.changePasswordData();
                }
            } else {
                return result;
            }
        } catch (e) {
            console.log(e);
        }
    };

    checkUsername = () => {
        if (this.state.username != this.state.confirmUsername) {
            return false;
        } else {
            return true;
        }
    };

    handleSubmit = async () => {
        event.preventDefault();
        const isSameName = this.checkUsername();
        if (isSameName) {
            const result = await this.changePasswordData();

            if (result !== undefined) {
                if (result.status == 200) {
                    this.props.handleLogout();

                    this.setState({
                        success: true,
                    });
                }
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
                                <input value={this.state.username} onChange={this.handleChange} name="username" />
                            </label>
                            <br></br>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-12  d-flex justify-content-center"> Reenter New Password</div>
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
