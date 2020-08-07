import React, { createRef } from 'react';

class Updates extends React.Component {
    render() {
        return (
            <div className="container update-page-container">
                <div className="update-page row justify-content-md-center">
                    <div className="col-12 pb-5 d-flex justify-content-center">
                        <h1>Updates</h1>
                    </div>
                    <div className="col-12 pb-5 d-flex justify-content-start">
                        <h5>Version 1.0: Initial release</h5>
                    </div>
                    <div className="col-12 pb-5 d-flex justify-content-start">
                        <h5>
                            Version 1.1: Fixed buttons to scale better and balance changes to the difficulty, circles now grow slower in all settings.
                            Also some other small UI changes made as well. Game mode now has border to better show game board.
                        </h5>
                    </div>
                    <div className="col-12 pb-5 d-flex justify-content-start">
                        <h5>
                            Version 1.2: Fixed buttons again to scale better. Homepage now has moving background. Changed custom mode so each mode now
                            only displays inputs that will change the respective mode. For example, precision no longer has min/max radius or radius
                            change input fields
                        </h5>
                    </div>
                    <div className="col-12 pb-5 d-flex justify-content-start">
                        <h5>
                            Version 2.0: User accounts are now available and ranked is enabled! Accounts require no email, only desired username and
                            password. Moving background now is much smoother and fixed some bugs where background wouldn't pause correctly. Accounts
                            also support name change, password change, and account deletion. Successfully clicked circles now turn green. Users
                            account will also stay logged in even after leaving site.
                        </h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Updates;
