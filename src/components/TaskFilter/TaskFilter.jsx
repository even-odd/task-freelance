import React, { Component } from "react";
import { connect } from 'react-redux';

import { filterTypeActions } from '../../consts/actionTypes';
import { ESelectType, EFilter, ESorting } from '../../consts/enums';

import Select from '../Select/Select';
class TaskFilter extends Component{

    state = {
        filter: { type: EFilter.ByPriority, value: 0 },
        sorting: { type: ESorting.ByStatus, value: 0 }
    };

    render() {
        let { activeFilter } = this.props; 
        let { filter, sorting } = this.state;

        return (
            <div className="task-filter">
                <div className="task-filter__method task-filter__find">
                    Find: 
                    <input type="text" defaultValue={ activeFilter.find } 
                           onBlur={(e) => this.dispatchProp('toFind', e.target.value)}/>
                </div>
                <div className="task-filter__method task-filter__filter">
                    Filter: 
                    <Select type={ ESelectType.Filter } current={ filter.type }
                            setChange={(type) => this.setProp('filter', 'type', +type)}/>
                    {/* <Select type={ ESelectType.Filter } current={ filter.value }
                            setChange={(value) => this.setProp('filter', 'value', +value)}/> */}
                </div>
                <div className="task-filter__method task-filter__sorting">
                    Sorting: 
                    <Select type={ ESelectType.Sorting } current={ sorting.type }
                            setChange={(type) => this.setProp('sorting', 'type', +type)}/>
                    {/* <Select type={ ESelectType.Sorting } current={ sorting.value }
                            setChange={(value) => this.setProp('sorting', 'value', +value)}/> */}
                </div>
               
                <button className="task-filter__btn-reverse" 
                        onClick={() => this.dispatchProp('reverse', !activeFilter.reverse)}>
                    Reverse
                </button>
            </div>
        );
    }

    dispatchProp = (name, data) => {
       this.props.setFilterProp(name, data);
    }

    setProp(method, methodProp, value = 0) {
        let methodFromState = this.state[method];
        this.dispatchProp(method, {...methodFromState, [methodProp]: value});

        this.setState({
            [method]: {
                [methodProp]: value
            }
        });
    }    
}

const mapStateToProps = (state) => {
    return { 
        activeFilter: state.activeFilter
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFilterProp: (name, data) => {
            return dispatch({type: filterTypeActions.SET_FILTER_PROP, name, data});
        }
    };
} 

export default connect(mapStateToProps, mapDispatchToProps)(TaskFilter);