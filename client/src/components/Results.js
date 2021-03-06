import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { newToken } from '../apicalls/api.js';

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
        };
    }
    //Update user highscore if logged in
    updateHighScore = async () => {
        if (this.props.mode == 'Ranked') {
            await newToken(); //Check if need to generate new access token

            const accessToken = localStorage.getItem('accessToken');

            try {
                const result = await fetch('/api/user/ranked', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'BEAR ' + accessToken,
                    },
                    body: JSON.stringify({
                        score: this.props.targetsHit,
                    }),
                });

                return result;
            } catch (e) {
                console.log(e);
            }
        }
    };

    componentDidMount = () => {
        this.updateHighScore();
        const score = localStorage.getItem('score');
        if (score !== null) {
            if (this.props.targetsHit > score) {
                localStorage.setItem('score', this.props.targetsHit);
            }
        } else {
            localStorage.removeItem('score');
            this.setState({
                msg: '*To save and compete on the scoreboard, please create an account or login.',
            });
        }
    };
    render() {
        return (
            <div className="container result-page-container">
                <div className="row justify-content-md-center">
                    <div className="col-12 pb-5 d-flex justify-content-around">
                        <h1 className="mode-page-title">Results</h1>
                    </div>
                    <div className="col-5 d-flex justify-content-center">
                        <div className="result-text">Accuracy: {Math.trunc((this.props.targetsHit / this.props.totalTargets) * 100)}%</div>
                    </div>
                    <div className="col-5 d-flex justify-content-center">
                        <div className="result-text">Targets Hit: {this.props.targetsHit}</div>
                    </div>
                    <div className="col-5 d-flex justify-content-center">
                        <div className="result-text">Mode: {this.props.mode}</div>
                    </div>
                    <div className="col-5 d-flex justify-content-center">
                        <div className="result-text">Difficulty: {this.props.difficulty}</div>
                    </div>
                    <div className="col-5 d-flex justify-content-center">
                        <button type="button" onClick={this.props.restartGameState} className="home-button-styling">
                            Play Again
                        </button>
                    </div>
                    <div className="col-5 d-flex justify-content-center">
                        <Link to="/">
                            <button type="button" className="home-button-styling">
                                Home
                            </button>
                        </Link>
                    </div>

                    <div className="col-12 pt-5 d-flex justify-content-around result-text">{this.state.msg}</div>
                </div>
            </div>
        );
    }
}

export default Results;
