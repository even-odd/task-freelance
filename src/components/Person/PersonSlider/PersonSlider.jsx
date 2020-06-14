import React, { Component } from 'react';

import Person from '../Person';
import { arrTest } from '../../../utils';
import { EVector } from '../../../consts/enums';

// props
//  persons
class PersonSlider extends Component {
    state = {
        personIndex: 0
    }

    render() {
        let { persons } = this.props;
        let { personIndex } = this.state;

        arrTest('persons', persons, 'PersonSlider.render', true);
        

        return (
            <div className="executor-slider">
                <button onClick={ () => this.toggle(EVector.Left) }> ‹ </button>
                <Person person={ persons[personIndex] }></Person>  
                {/* {persons[personIndex] + ''} */}
                <button onClick={ () => this.toggle(EVector.Right) }> › </button>
            </div>
        );
    }

    toggle = (vector) => { 
        this.setState((prevState, props) => {
            return {
                personIndex: this.getNewIndex(vector, prevState, props)
            };
        });
    }

    getNewIndex = (vector, prevState, props) => {
        let amoutPersons = props.persons.length;
        let newIndex;

        switch(vector) {
            case EVector.Left:
                newIndex = prevState.personIndex + 1;
                if(newIndex > amoutPersons - 1) newIndex = 0;
                break;
            case EVector.Right:
                newIndex = prevState.personIndex - 1;
                if(newIndex < 0) newIndex = (amoutPersons > 0) ? amoutPersons - 1 : 0;
                break;
            default:
                newIndex = 0;
                console.error('Err: PersonSlider.getNewIndex - invalid vector');
        }

        console.debug(`PersonSlider.getNewIndex (vector: ${vector}, newIndex: ${newIndex})`);
        return newIndex;
    }
} 

export default PersonSlider;