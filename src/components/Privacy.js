import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Privacy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container privacy-page-container">
                <div className="privacy-page row justify-content-md-center">
                    <div className="col-12 pb-5 d-flex justify-content-center">
                        <h1>Privacy Policy</h1>
                    </div>
                    <div className="col-12 pb-5 d-flex justify-content-center">
                        <h5> We don't store your data, period.</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Privacy;
