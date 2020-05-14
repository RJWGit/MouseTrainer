import React, { createRef } from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="footer navbar-fixed-bottom">
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-center footer-navbar">
                    <a class="nav-item nav-link footer-item" href="#">
                        Privacy Policy
                    </a>
                    <a class="nav-item nav-link footer-item" href="#">
                        Contact Us
                    </a>
                    <a class="nav-item nav-link footer-item" href="https://github.com/RJWGit/MouseBooster">
                        GitHub
                    </a>
                    <a class="nav-item nav-link footer-item" href="#">
                        Donate
                    </a>
                </nav>
            </div>
        );
    }
}

export default Footer;
