import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

//TODO: Add pictures and add formatting to custom mode page
class Difficulty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customMode: false,
            width: 1200,
            height: 800,
            radius: 1,
            radiusChange: 1,
            maxRadius: 50,
            minRadius: 1,
            difficulty: 'medium',
            addCircleTimer: 800,
            mode: 'autobalance',
            seconds: 50,
        };
    }

    gameState = e => {
        const gameStateObj = {};

        console.log(this.props.mode);
        console.log(e.target.name);

        switch (this.props.mode) {
            case 'classic':
                if (e.target.name == 'easy') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 1;
                    gameStateObj.radiusChange = 1;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 800;
                    gameStateObj.maxRadius = 50;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'medium') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 1;
                    gameStateObj.radiusChange = 1;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 600;
                    gameStateObj.maxRadius = 50;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'hard') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 1;
                    gameStateObj.radiusChange = 1;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 400;
                    gameStateObj.maxRadius = 50;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }

            case 'autobalance':
                if (e.target.name == 'easy') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 5;
                    gameStateObj.radiusChange = 1;
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
                    gameStateObj.radius = 5;
                    gameStateObj.radiusChange = 1;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 700;
                    gameStateObj.maxRadius = 45;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'hard') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.seconds = 60;
                    gameStateObj.radius = 5;
                    gameStateObj.radiusChange = 1;
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
                    gameStateObj.radius = 10;
                    gameStateObj.radiusChange = 1;
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
                    gameStateObj.radius = 10;
                    gameStateObj.radiusChange = 1;
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
                    gameStateObj.radius = 10;
                    gameStateObj.radiusChange = 1;
                    gameStateObj.difficulty = e.target.name;
                    gameStateObj.mode = this.props.mode;
                    gameStateObj.addCircleTimer = 800;
                    gameStateObj.maxRadius = 35;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }

            default:
                alert('Fail');
        }
    };

    customDifficulty = () => {
        this.setState({
            customMode: !this.state.customMode,
        });
    };

    handleChange = e => {
        const name = e.target.name;
        console.log(name);
        this.setState({
            [name]: e.target.value,
        });
    };

    handleSubmit = () => {
        event.preventDefault();
        const gameStateObj = {};

        gameStateObj.width = parseInt(this.state.width, 10);
        gameStateObj.height = parseInt(this.state.height, 10);
        gameStateObj.seconds = parseInt(this.state.width, 10);
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
                        <div className="col-12 pb-5 d-flex justify-content-around">
                            <h1 className="mode-page-title">Difficulty</h1>
                        </div>
                        <div className="col-4 mb-5 d-flex justify-content-around">
                            <div className="row justify-content-center">
                                <div className="col-12 d-flex justify-content-center mode-page-subtitle">Easy</div>
                                <Link to="/play">
                                    <button type="button" name="easy" onClick={this.gameState} className="mode-screen-styling">
                                        {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-4 mb-5 d-flex justify-content-around">
                            <div className="row justify-content-center">
                                <div className="col-12 d-flex justify-content-center mode-page-subtitle">Medium</div>
                                <Link to="/play">
                                    <button type="button" name="medium" onClick={this.gameState} className="mode-screen-styling">
                                        {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="col-4 mb-5 d-flex justify-content-around">
                            <div className="row justify-content-center">
                                <div className="col-12 d-flex justify-content-center mode-page-subtitle">Hard</div>
                                <Link to="/play">
                                    <button type="button" name="hard" onClick={this.gameState} className="mode-screen-styling">
                                        {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 mb-5 d-flex justify-content-around">
                            <div className="row justify-content-center">
                                <div className="col-12 d-flex justify-content-center mode-page-subtitle">Custom</div>
                                <button type="button" name="hard" onClick={this.customDifficulty} className="mode-screen-styling">
                                    {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container mode-page-container">
                    <form>
                        <label>
                            Width:
                            <input type="number" name="width" value={this.state.width} onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <label>
                            height:
                            <input type="number" name="height" value={this.state.height} onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <label>
                            seconds:
                            <input type="number" name="seconds" value={this.state.seconds} onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <label>
                            addCircleTimer:
                            <input type="number" name="addCircleTimer" value={this.state.addCircleTimer} onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <label>
                            radius:
                            <input type="number" name="radius" value={this.state.radius} onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <label>
                            radiusChange:
                            <input type="number" name="radiusChange" value={this.state.radiusChange} onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <label>
                            maxRadius:
                            <input type="number" name="maxRadius" value={this.state.maxRadius} onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <label>
                            minRadius:
                            <input type="number" name="minRadius" value={this.state.minRadius} onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <Link to="/play">
                            <button onClick={this.handleSubmit} type="button" class="btn btn-secondary">
                                Submit
                            </button>
                        </Link>
                    </form>
                </div>
            );
        }
    }
}

export default Difficulty;
