import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

//TODO:
//Update pictures for modes to reflect an in-game image
class Modes extends React.Component {
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
        switch (e.target.name) {
            case 'classic':
            case 'speed':
                gameStateObj.width = 800;
                gameStateObj.height = 600;
                gameStateObj.radius = 5;
                gameStateObj.radiusChange = 1;
                gameStateObj.difficulty = 'easy';
                gameStateObj.mode = 'classic';
                gameStateObj.addCircleTimer = 1000;
                gameStateObj.maxRadius = 70;
                gameStateObj.minRadius = 1;
                this.props.updateGameState(gameStateObj);
                break;

            case 'precision':
                gameStateObj.width = 800;
                gameStateObj.height = 600;
                gameStateObj.radius = 5;
                gameStateObj.radiusChange = 1;
                gameStateObj.difficulty = 'easy';
                gameStateObj.mode = 'precision';
                gameStateObj.addCircleTimer = 1000;
                gameStateObj.maxRadius = 70;
                gameStateObj.minRadius = 1;
                this.props.updateGameState(gameStateObj);
                break;
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
                        <div className="row justify-content-md-center">
                            <div className="mode-page-subtitle">Speed</div>
                            <Link to="/play">
                                <button onClick={this.gameState} type="button" name="speed" className="mode-screen-styling">
                                    {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-4 mb-5 d-flex justify-content-around">
                        <div className="row justify-content-md-center">
                            <div className="mode-page-subtitle">Precision</div>
                            <Link to="/play">
                                <button onClick={this.gameState} type="button" name="precision" className="mode-screen-styling">
                                    {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-4 mb-5 d-flex justify-content-around">
                        <div className="row justify-content-md-center">
                            <div className="mode-page-subtitle">Classic</div>
                            <button type="button" name="classic" className="mode-screen-styling">
                                {/* <img src="target1.png" className="mode-screen-image"></img> */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modes;