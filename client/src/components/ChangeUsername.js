import React, { createRef } from 'react';
import { newToken } from '../apicalls/api.js';
import { BrowserRouter as Link, Redirect } from 'react-router-dom'; //You need link for redirect to work??

class ChangeUsername extends React.Component {
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
        console.log(this.state.success);
        this.setState({
            [name]: e.target.value,
        });
    };

    changeUsernameData = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken === null) return undefined;

        try {
            let result = await fetch('http://localhost:3000/api/user/changeusername', {
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

            if (result.status !== 200) {
                const token = await newToken();
                if (token.status == 200) {
                    return await this.changeUsernameData();
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
            const result = await this.changeUsernameData();

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
