import React, { Component } from "react";
import { connect } from 'react-redux';

import './TaskFilter.css';
import { filterTypeActions } from '../../consts/actionTypes';
import { ESelectType, EFilter, ESorting, EPriority } from '../../consts/enums';

import Select from '../Select/Select';
class TaskFilter extends Component{

    state = {
        filter: { type: EFilter.None, value: EPriority.Wish },
        sorting: { type: ESorting.None, value: EPriority.Wish }
    };

    render() {
        let { activeFilter } = this.props; 
        let { filter, sorting } = this.state;

        let filterValue = this.getValue('filter', filter.type);
        let sortingValue = this.getValue('sorting', sorting.type);

        return (
            <div className="task-filter">
                <div className="task-filter__method task-filter__find">
                    <br/>
                    <span className='task-filter__method-title'>Поиск:</span>
                    <input type="text" defaultValue={ activeFilter.find } 
                           onBlur={(e) => this.dispatchProp('toFind', e.target.value)}/>
                </div>
                <div className="task-filter__method task-filter__filter">
                    <span className='task-filter__method-title'>Фильтрация:</span>
                    <br/>
                    <Select type={ ESelectType.Filter } current={ filter.type }
                            setChange={(type) => this.setProp('filter', 'type', +type)}/>
                    <Select type={ filterValue } current={ filter.value }
                            setChange={(value) => this.setProp('filter', 'value', +value)}/>
                </div>
                <div className="task-filter__method task-filter__sorting">
                    <span className='task-filter__method-title'>Сортировка:</span>
                    <br/>
                    <Select type={ ESelectType.Sorting } current={ sorting.type }
                            setChange={(type) => this.setProp('sorting', 'type', +type)}/>
                    <Select type={ sortingValue } current={ sorting.value }
                            setChange={(value) => this.setProp('sorting', 'value', +value)}/>
                </div>
               
                {/* TODO: make lighting for Reverse(true/false) */}
                <button className={`task-filter__method task-filter__reverse ${activeFilter.reverse}`} 
                        onClick={() => this.dispatchProp('reverse', !activeFilter.reverse)}>
                    Переворот
                </button> 
            </div>
        );
    }

    dispatchProp = (name, data) => {
       this.props.setFilterProp(name, data);
    }

    setProp = (method, methodProp, value = 0) => {
        let methodFromState = this.state[method];
        this.dispatchProp(method, {...methodFromState, [methodProp]: value});

        this.setState({
            [method]: { ...methodFromState, [methodProp]: value }
        });
    }    

    getValue = (method, type) => {
        let locEnum;
        switch(method) {
            case 'filter':
                locEnum = EFilter;
                break;
            case 'sorting':
                locEnum = ESorting;
                break;
            default: // хз, как правильно обработать
                throw new Error(`TaskFilter.getValue: unknow method:`, method);
        }

        switch(type) {
            case locEnum.None:
                return ESelectType.None;
            case locEnum.ByExecutor:
                return ESelectType.Executor;
            case locEnum.ByPriority:
                return ESelectType.Priority;
            case locEnum.ByStatus:
                return ESelectType.Status;
            default:
                console.error(`TaskFilter.getValue: unknow ${method} type`);
        }
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