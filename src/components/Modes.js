import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Difficulty from './Difficulty.js';

//TODO:
//Update pictures for modes to reflect an in-game image
class Modes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'modes',
            mode: 'classic',
        };
    }

    changePage(e, newPage) {
        this.setState({
            page: newPage,
            mode: e.target.name,
        });
    }

    render() {
        if (this.state.page == 'modes') {
            return (
                <div className="container mode-page-container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 pb-5 d-flex justify-content-around">
                            <h1 className="mode-page-title">Modes</h1>
                        </div>
                        <div className="col-4 mb-5 d-flex justify-content-around">
                            <div className="row justify-content-md-center">
                                <div className="col-12 d-flex justify-content-center mode-page-subtitle">Classic</div>
                                <button onClick={e => this.changePage(e, 'difficulty')} type="button" name="classic" className="mode-screen-styling">
                                    {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                </button>
                            </div>
                        </div>
                        <div className="col-4 mb-5 d-flex justify-content-around">
                            <div className="row justify-content-md-center">
                                <div className="col-12 d-flex justify-content-center mode-page-subtitle">Precision</div>
                                <button
                                    onClick={e => this.changePage(e, 'difficulty')}
                                    type="button"
                                    name="precision"
                                    className="mode-screen-styling"
                                >
                                    {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                </button>
                            </div>
                        </div>
                        <div className="col-4 mb-5 d-flex justify-content-around">
                            <div className="row justify-content-md-center">
                                <div className="col-12 d-flex justify-content-center mode-page-subtitle">Speed</div>
                                <button onClick={e => this.changePage(e, 'difficulty')} type="button" name="speed" className="mode-screen-styling">
                                    {/* <img src="target1.png" className="mode-screen-image"></img> */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Difficulty updateGameState={this.props.updateGameState} mode={this.state.mode}></Difficulty>
                </div>
            );
        }
    }
}

export default Modes;
