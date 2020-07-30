import React from 'react';
import { Button, Icon, Dropdown } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class DropDownMenu extends React.Component {
    render() {
        const trigger = (
            <span>
                <Icon name="user" /> Hello, {this.props.username}
            </span>
        );

        const options = [
            { key: 'Account', text: 'Account', as: Link, to: '/UserAccount' },
            { key: 'Sign Out', text: 'Sign Out', onClick: this.props.handleLogout },
        ];

        return (
            <div>
                <Dropdown trigger={trigger} options={options} />
            </div>
        );
    }
}

export default DropDownMenu;
