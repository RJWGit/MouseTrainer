import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Difficulty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customMode: false,
            width: 1200,
            height: 800,
            radius: 7,
            radiusChange: 0.7,
            maxRadius: 50,
            minRadius: 1,
            difficulty: 'medium',
            addCircleTimer: 800,
            mode: 'autobalance',
            seconds: 60,
        };
    }

    gameState = e => {
        const gameStateObj = {};

        console.log(this.props.mode);
        console.log(e.target.name);

        switch (this.props.mode) {
            case 'classic':
                if (e.target.name == 'easy') {
                    gameStateObj.width = 1100;
                    gameStateObj.height = 700;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 1;
                    gameStateObj.radiusChange = 0.7;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 700;
                    gameStateObj.maxRadius = 50;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'medium') {
                    gameStateObj.width = 1100;
                    gameStateObj.height = 700;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 1;
                    gameStateObj.radiusChange = 0.7;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 500;
                    gameStateObj.maxRadius = 50;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'hard') {
                    gameStateObj.width = 1100;
                    gameStateObj.height = 700;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 1;
                    gameStateObj.radiusChange = 0.7;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 300;
                    gameStateObj.maxRadius = 50;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }

            case 'autobalance':
                if (e.target.name == 'easy') {
                    gameStateObj.width = 1100;
                    gameStateObj.height = 700;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 1;
                    gameStateObj.radiusChange = 0.7;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 722;
                    gameStateObj.maxRadius = 50;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'medium') {
                    gameStateObj.width = 1100;
                    gameStateObj.height = 700;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 1;
                    gameStateObj.radiusChange = 0.7;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 500;
                    gameStateObj.maxRadius = 45;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'hard') {
                    gameStateObj.width = 1100;
                    gameStateObj.height = 700;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 1;
                    gameStateObj.radiusChange = 0.7;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 400;
                    gameStateObj.maxRadius = 40;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
            case 'precision':
                if (e.target.name == 'easy') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 7;
                    gameStateObj.radiusChange = 0.7;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 1000;
                    gameStateObj.maxRadius = 50;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'medium') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 7;
                    gameStateObj.radiusChange = 0.7;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 900;
                    gameStateObj.maxRadius = 45;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'hard') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 7;
                    gameStateObj.radiusChange = 0.7;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 800;
                    gameStateObj.maxRadius = 35;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }

            default:
        }
    };

    customDifficulty = () => {
        this.setState({
            customMode: !this.state.customMode,
        });
    };

    handleChange = e => {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });
    };

    handleSubmit = () => {
        event.preventDefault();
        const gameStateObj = {};

        gameStateObj.width = parseInt(this.state.width, 10);
        gameStateObj.height = parseInt(this.state.height, 10);
        gameStateObj.seconds = parseInt(this.state.seconds, 10);
        gameStateObj.radius = parseInt(this.state.radius, 10);
        gameStateObj.radiusChange = parseFloat(this.state.radiusChange);
        gameStateObj.addCircleTimer = parseInt(this.state.addCircleTimer, 10);
        gameStateObj.maxRadius = parseInt(this.state.maxRadius, 10);
        gameStateObj.minRadius = parseInt(this.state.minRadius, 10);
        gameStateObj.mode = this.props.mode;
        gameStateObj.difficulty = 'Custom';

        this.props.updateGameState(gameStateObj);
    };
    render() {
        if (!this.state.customMode) {
            return (
                <div className="container mode-page-container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 pb-3 d-flex justify-content-around">
                            <h1 className="mode-page-title">Difficulty</h1>
                        </div>
                        <div className="col-4 mb-5 d-flex justify-content-around">
                            <div className="row justify-content-center">
                                <div className="col-12 d-flex justify-content-center mode-page-subtitle"></div>
                                <Link to="/play">
                                    <button type="button" name="easy" onClick={this.gameState} className="mode-screen-styling easy-button">
                                        {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                        Easy
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-4 mb-5 d-flex justify-content-around">
                            <div className="row justify-content-center">
                                <div className="col-12 d-flex justify-content-center mode-page-subtitle"></div>
                                <Link to="/play">
                                    <button type="button" name="medium" onClick={this.gameState} className="mode-screen-styling medium-button">
                                        {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                        Medium
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="col-4 mb-5 d-flex justify-content-around">
                            <div className="row justify-content-center">
                                <div className="col-12 d-flex justify-content-center mode-page-subtitle"></div>
                                <Link to="/play">
                                    <button type="button" name="hard" onClick={this.gameState} className="mode-screen-styling hard-button">
                                        {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                        Hard
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 mb-5 d-flex justify-content-around">
                            <div className="row justify-content-center">
                                <div className="col-12 d-flex justify-content-center mode-page-subtitle"></div>
                                <button type="button" name="hard" onClick={this.customDifficulty} className="mode-screen-styling custon-button">
                                    {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                    Custom
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            switch (this.props.mode) {
                case 'autobalance':
                case 'classic':
                    return (
                        <div className="container justify-content-center mode-page-container">
                            <div className="row justify-content-center">
                                <div className="col-12 mb-3 d-flex justify-content-around">
                                    <h1 className="mode-page-title">Custom Settings</h1>
                                </div>
                                <div className="col-6 d-flex justify-content-end">
                                    <div>
                                        <label>
                                            Game Width:
                                            <input name="width" className="form-control" value={this.state.width} onChange={this.handleChange} />
                                        </label>
                                        <br></br>
                                        <label>
                                            Game Height:
                                            <input name="height" className="form-control" value={this.state.height} onChange={this.handleChange} />
                                        </label>
                                        <br></br>
                                        <label>
                                            Seconds:
                                            <input name="seconds" className="form-control" value={this.state.seconds} onChange={this.handleChange} />
                                        </label>
                                        <br></br>
                                        <label>
                                            Circle Respawn Timer*
                                            <input
                                                name="addCircleTimer"
                                                className="form-control"
                                                value={this.state.addCircleTimer}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <br></br>
                                    </div>
                                </div>
                                <br></br>
                                <div className="col-6 d-flex justify-content-start">
                                    <div>
                                        <label>
                                            Circle Initial Radius:
                                            <input name="radius" className="form-control" value={this.state.radius} onChange={this.handleChange} />
                                        </label>
                                        <br></br>
                                        <label>
                                            Circle growth rate:
                                            <input
                                                name="radiusChange"
                                                className="form-control"
                                                value={this.state.radiusChange}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <br></br>
                                        <label>
                                            Max Radius:
                                            <input
                                                name="maxRadius"
                                                className="form-control"
                                                value={this.state.maxRadius}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <br></br>
                                        <label>
                                            Minimum Radius:
                                            <input
                                                name="minRadius"
                                                className="form-control"
                                                value={this.state.minRadius}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <br></br>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-center mt-3 submit-div">
                                    <Link className="submit-link d-flex justify-content-center" to="/play">
                                        <button onClick={this.handleSubmit} type="button" className="submit-button">
                                            Submit
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-12 d-flex justify-content-center submit-div">
                                    Note: Failure to enter reasonable numbers will break the game or not work correctly. Refresh to fix.
                                    <br></br>
                                    *In miliseconds, 1 seconds = 1000 miliseconds
                                </div>
                            </div>
                        </div>
                    );
                    break;

                case 'precision':
                    return (
                        <div className="container justify-content-center mode-page-container">
                            <div className="row justify-content-center">
                                <div className="col-12 mb-3 d-flex justify-content-around">
                                    <h1 className="mode-page-title">Custom Settings</h1>
                                </div>
                                <div className="col-6 d-flex justify-content-end">
                                    <div>
                                        <label>
                                            Game Width:
                                            <input name="width" className="form-control" value={this.state.width} onChange={this.handleChange} />
                                        </label>
                                        <br></br>
                                        <label>
                                            Game Height:
                                            <input name="height" className="form-control" value={this.state.height} onChange={this.handleChange} />
                                        </label>
                                        <br></br>
                                    </div>
                                </div>
                                <br></br>
                                <div className="col-6 d-flex justify-content-start">
                                    <div>
                                        <label>
                                            Circle Initial Radius:
                                            <input name="radius" className="form-control" value={this.state.radius} onChange={this.handleChange} />
                                        </label>
                                        <br></br>
                                        <label>
                                            Seconds:
                                            <input name="seconds" className="form-control" value={this.state.seconds} onChange={this.handleChange} />
                                        </label>
                                        <br></br>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                    <label>
                                        Circle Respawn Timer*
                                        <input
                                            name="addCircleTimer"
                                            className="form-control"
                                            value={this.state.addCircleTimer}
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                    <br></br>
                                </div>
                                <div className="col-12 d-flex justify-content-center mt-3 submit-div">
                                    <Link className="submit-link d-flex justify-content-center" to="/play">
                                        <button onClick={this.handleSubmit} type="button" className="submit-button">
                                            Submit
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-12 d-flex justify-content-center submit-div">
                                    Note: Failure to enter reasonable numbers will break the game or will not work correctly. Refresh to fix.
                                    <br></br>
                                    *In miliseconds, 1 seconds = 1000 miliseconds
                                </div>
                            </div>
                        </div>
                    );
                    break;
            }
        }
    }
}

export default Difficulty;
