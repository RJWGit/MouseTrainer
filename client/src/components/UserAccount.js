import React, { createRef } from 'react';
import ChangeUsername from './ChangeUsername.js';
import ChangePassword from './ChangePassword.js';
import DeleteAccount from './DeleteAccount.js';

class UserAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            highscore: '',
            changeusername: false,
            changepassword: false,
            deleteaccount: false,
        };
    }

    componentDidMount = async () => {
        const name = localStorage.getItem('username');
        let highscore = localStorage.getItem('score');
        this.setState({
            username: name,
            highscore: highscore,
        });

        //Get new highscore from server if not found in localstorage
        if (highscore === null) {
            highscore = await this.getScoreData(name);

            if (highscore !== undefined) {
                this.setState({
                    highscore: highscore.score,
                });
                localStorage.setItem('score', highscore.score);
            }
        }
    };

    changeUsername = () => {
        this.setState({
            changeusername: !this.state.changeusername,
        });
    };

    changePassword = () => {
        this.setState({
            changepassword: !this.state.changepassword,
        });
    };

    deleteAccount = () => {
        this.setState({
            deleteaccount: !this.state.deleteaccount,
        });
    };

    getScoreData = async () => {
        try {
            const result = await fetch('http://localhost:3000/api/user/gethighscore', {
                method: 'Post',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: name,
                }),
            });
            const score = await result.json();
            return score;
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        if (this.state.changeusername) {
            return <ChangeUsername handleLogout={this.props.handleLogout} toggle={this.changeUsername} />;
        } else if (this.state.changepassword) {
            return <ChangePassword handleLogout={this.props.handleLogout} toggle={this.changePassword} />;
        } else if (this.state.deleteaccount) {
            return <DeleteAccount handleLogout={this.props.handleLogout} toggle={this.deleteAccount} />;
        } else {
            return (
                <div className="container user-account-container">
                    <div className="col-12 pb-5 d-flex justify-content-around">
                        <h1 className="mode-page-title">{this.state.username}'s Account</h1>
                    </div>
                    <div className="col-12 pb-5 d-flex justify-content-around">
                        <h1 className="mode-page-title">High Score: {this.state.highscore}</h1>
                    </div>

                    <div className="col-12 d-flex justify-content-around">
                        <div className="col-6 d-flex justify-content-end">
                            <button type="button" onClick={this.changeUsername} className="account-button-styling">
                                Change Username
                            </button>
                        </div>
                        <div className="col-6 d-flex justify-content-start">
                            <button type="button" onClick={this.changePassword} className="account-button-styling">
                                Change Password
                            </button>
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-around">
                        <button type="button" onClick={this.deleteAccount} className="account-deletebutton-styling">
                            Delete Account
                        </button>
                    </div>
                </div>
            );
        }
    }
}

export default UserAccount;
