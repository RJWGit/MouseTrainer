import React, { createRef } from 'react';

class UserAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <div className="col-12 pb-5 d-flex justify-content-around">
                    <h1 className="mode-page-title">User Page</h1>
                </div>
            </div>
        );
    }
}

export default UserAccount;
