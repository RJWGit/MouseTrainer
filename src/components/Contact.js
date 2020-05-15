import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container privacy-page-container">
                <div className="privacy-page row justify-content-md-center">
                    <div className="col-12 pb-5 d-flex justify-content-center">
                        <h1>Contact</h1>
                    </div>
                    <div className="col-12 pb-5 d-flex justify-content-center">
                        <h5> For suggestions, questions, or anything, you can contact me on GitHub or reach me at RodneyjWalton@yahoo.com</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
