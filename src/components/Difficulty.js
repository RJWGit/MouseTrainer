import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

//TODO:
//Update pictures for modes to reflect an in-game image
class Difficulty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // width: newGameState.width,
    // height: newGameState.height,
    // radius: newGameState.radius,
    // radiusChange: newGameState.radiusChange,
    // difficulty: newGameState.difficulty,
    // mode:newGameState.mode,
    // addCircleTimer:newGameState.addCircleTimer,
    // maxRadius: newGameState.maxRadius,
    // minRadius: newGameState.minRadius,
    gameState = e => {
        const gameStateObj = {};

        console.log(this.props.mode);
        console.log(e.target.name);

        switch (this.props.mode) {
            case 'classic':
            case 'speed':
                if (e.target.name == 'easy') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.radius = 5;
                    gameStateObj.radiusChange = 1;
                    gameStateObj.difficulty = 'easy';
                    gameStateObj.mode = 'classic';
                    gameStateObj.addCircleTimer = 1000;
                    gameStateObj.maxRadius = 50;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'medium') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.radius = 5;
                    gameStateObj.radiusChange = 1;
                    gameStateObj.difficulty = 'medium';
                    gameStateObj.mode = 'classic';
                    gameStateObj.addCircleTimer = 700;
                    gameStateObj.maxRadius = 45;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'hard') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.radius = 5;
                    gameStateObj.radiusChange = 1;
                    gameStateObj.difficulty = 'hard';
                    gameStateObj.mode = 'classic';
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
                    gameStateObj.radius = 5;
                    gameStateObj.radiusChange = 1;
                    gameStateObj.difficulty = 'easy';
                    gameStateObj.mode = 'precision';
                    gameStateObj.addCircleTimer = 1000;
                    gameStateObj.maxRadius = 50;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'medium') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.radius = 5;
                    gameStateObj.radiusChange = 1;
                    gameStateObj.difficulty = 'medium';
                    gameStateObj.mode = 'precision';
                    gameStateObj.addCircleTimer = 900;
                    gameStateObj.maxRadius = 45;
                    gameStateObj.minRadius = 1;
                    this.props.updateGameState(gameStateObj);
                    break;
                }
                if (e.target.name == 'hard') {
                    gameStateObj.width = 800;
                    gameStateObj.height = 600;
                    gameStateObj.radius = 5;
                    gameStateObj.radiusChange = 1;
                    gameStateObj.difficulty = 'hard';
                    gameStateObj.mode = 'precision';
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

    render() {
        return (
            <div className="container mode-page-container">
                <div className="row justify-content-md-center">
                    <div className="col-12 pb-5 d-flex justify-content-around">
                        <h1 className="mode-page-title">Modes</h1>
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
                </div>
            </div>
        );
    }
}

export default Difficulty;
