import React, { createRef } from 'react';
import Classic from './Classic.js';
import Precision from './Precision.js';
import AutoBalance from './AutoBalance';

class ChosenMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getGameState = this.props.getGameState();
    }

    render() {
        if (this.getGameState.mode == 'classic') {
            return <Classic getGameState={this.getGameState}></Classic>;
        }
        if (this.getGameState.mode == 'precision') {
            return <Precision getGameState={this.getGameState}></Precision>;
        }
        if (this.getGameState.mode == 'autobalance') {
            return <AutoBalance getGameState={this.getGameState}></AutoBalance>;
        }
    }
}

export default ChosenMode;
