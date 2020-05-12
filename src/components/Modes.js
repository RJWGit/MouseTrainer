import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Modes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container mode-page-container">
                <div className="row justify-content-md-center">
                    <div className="col-12 pb-5 d-flex justify-content-around">
                        <h1 className="mode-page-title">Modes</h1>
                    </div>
                    <div className="col-4 mb-5 d-flex justify-content-around">
                        <div className="row justify-content-md-center">
                            <div className="mode-page-subtitle">Mode1</div>
                            <button type="button" className="mode-screen-styling">
                                {/* <img src="target1.png" className="mode-screen-image"></img> */}
                            </button>
                        </div>
                    </div>
                    <div className="col-4 mb-5 d-flex justify-content-around">
                        <div className="row justify-content-md-center">
                            <div className="mode-page-subtitle">Mode1</div>
                            <button type="button" className="mode-screen-styling">
                                {/* <img src="target1.png" className="mode-screen-image"></img> */}
                            </button>
                        </div>
                    </div>
                    <div className="col-4 mb-5 d-flex justify-content-around">
                        <div className="row justify-content-md-center">
                            <div className="mode-page-subtitle">Mode1</div>
                            <button type="button" className="mode-screen-styling">
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
