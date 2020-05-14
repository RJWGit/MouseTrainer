import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container result-page-container">
                <div className="row justify-content-md-center">
                    <div className="col-12 pb-5 d-flex justify-content-around">
                        <h1 className="mode-page-title">Results</h1>
                    </div>
                    <div className="col-6  d-flex justify-content-center">
                        <div className="result-text">Accuracy: {Math.trunc((this.props.targetsHit / this.props.totalTargets) * 100)}%</div>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <div className="result-text">Targets Hit: {this.props.targetsHit}</div>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <div className="result-text">Mode: {this.props.mode}</div>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <div className="result-text">Difficulty: {this.props.difficulty}</div>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <button type="button" onClick={this.props.restartGameState} className="home-button-styling">
                            Play Again
                        </button>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <Link to="/">
                            <button type="button" className="home-button-styling">
                                Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Results;
