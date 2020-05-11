import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container home-page-container">
                <div className="row justify-content-md-center">
                    <div className="col pb-5 d-flex justify-content-around">
                        <h1 className="home-page-title">Aim Trainer</h1>
                    </div>
                    <div className="col-12 mb-5 d-flex justify-content-around">
                        <Link to="/play">
                            <button type="button" className="home-button-styling">
                                Play
                            </button>
                        </Link>
                        <Link to="/modes">
                            <button type="button" className="home-button-styling">
                                Modes
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
