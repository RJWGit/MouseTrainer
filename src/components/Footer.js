import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="footer navbar-fixed-bottom">
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-center footer-navbar">
                    <Link to="/privacy" class="nav-item nav-link footer-item">
                        Privacy Policy
                    </Link>
                    <Link to="/contact" class="nav-item nav-link footer-item">
                        Contact Us
                    </Link>
                    <a class="nav-item nav-link footer-item" href="#">
                        Donate
                    </a>
                </nav>
            </div>
        );
    }
}

export default Footer;
