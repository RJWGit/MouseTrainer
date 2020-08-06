import React, { createRef } from 'react';
import { newToken } from '../apicalls/api.js';
import { BrowserRouter as Link, Redirect } from 'react-router-dom'; //You need link for redirect to work??

class DeleteAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
        };
    }

    deleteAccountData = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            let result = await fetch('http://localhost:3000/api/user/deleteaccount', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'BEAR ' + accessToken,
                },
            });

            if (result.status !== 200) {
                const token = await newToken();
                if (token.status == 200) {
                    return await this.deleteAccountData();
                }
            } else {
                return result;
            }
        } catch (e) {
            console.log(e);
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
