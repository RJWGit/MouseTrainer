import React, { createRef } from 'react';
import { newToken } from '../apicalls/api.js';
import { BrowserRouter as Link, Redirect } from 'react-router-dom'; //You need link for redirect to work??

class DeleteAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            errorMessage: '',
        };
    }

    deleteAccountData = async () => {
        await newToken(); //Check if need to generate new access token

        const accessToken = localStorage.getItem('accessToken');
        try {
            let result = await fetch('/api/user/deleteaccount', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'BEAR ' + accessToken,
                },
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
        const result = await this.deleteAccountData();

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
    };

    render() {
        return (
            <div className="container login-page-container">
                <div className="row justify-content-md-center">
                    <div className="col-12 pb-5 pt-3 d-flex justify-content-center">
                        <h1>Delete Account</h1>
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
                        <Redirect to="/"></Redirect>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default DeleteAccount;
