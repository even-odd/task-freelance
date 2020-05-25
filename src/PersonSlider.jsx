import React, { Component } from 'react';

import Person from './Person';

class PersonSlider extends Component {
    state = {
        indexExecutor: 0
    }

    toggleLeft = () => {
        this.setState({
            indexExecutor: this.state.indexExecutor - 1
        });
    }

    toggleRight = () => {
        this.setState({
            indexExecutor: this.state.indexExecutor + 1 
        });
    }

    render() {
        let { persons } = this.props;
        return (
            <div className="executor-slider">
                <button onClick={ this.toggleLeft() }> ‹ </button>
                <Person person={ persons[this.state.indexExecutor] }></Person>  
                <button onClick={ this.toggleRight() }> › </button>
            </div>
        );
    }
} 

export default PersonSlider;