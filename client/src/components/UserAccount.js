import React, { createRef } from 'react';

class UserAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            highscore: '',
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
            highscore = await this.getScoreData();

            if (highscore !== undefined) {
                this.setState({
                    highscore: highscore.score,
                });
                localStorage.setItem('score', highscore.score);
            }
        }
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
                    username: 'f3llop4nda',
                }),
            });
            const score = await result.json();
            return score;
        } catch (e) {
            console.log(e);
        }
    };

    render() {
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
                        <button type="button" className="account-button-styling">
                            Change Username
                        </button>
                    </div>
                    <div className="col-6 d-flex justify-content-start">
                        <button type="button" className="account-button-styling">
                            Change Password
                        </button>
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-around">
                    <button type="button" className="account-deletebutton-styling">
                        Delete Account
                    </button>
                </div>
            </div>
        );
    }
}

export default UserAccount;
