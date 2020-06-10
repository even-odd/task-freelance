import React, { Component } from 'react';
import { ESelectType, propsPriority, propsStatus, propsFilter, propsSorting } from '../../consts/enums';
import { numberTest } from '../../utils';

// Select в виде велосипеда
//props:
// type: ESelectTypes
// multiple: boolean // TODO-advanced: multiple

// data {
//  className: string
//  options: string
// }
class Select extends Component {
    constructor(props) {
        super(props);

        numberTest('type', props.type, 'Select', true);
        this.state = {
            current: (props.current) ? props.current : '',
            data: this.getInitialData(props.type)
        };
    }
   
    render() { 
        let { current, data } = this.state;
        
        // проверка на undefined
        current = (current) ? current : '';
        return (
            <select className={`c-select c-select-${data.className}`}
                    value={ current } 
                    onChange={ this.handleChange }>
                {
                    data.options.map((el) => 
                        <option className={`c-select__option c-select-${data.className}__option`} 
                                value={el.value}
                                key={el.value}>
                                { el.title }
                        </option>
                    )
                }
            </select>
        );
    }

    // Инициализируем выбор для select 
    getInitialData = (type) => {
        let initialData = {
            className: '',
            options: []
        };

        switch(type) {
            case ESelectType.Priority: 
                initialData.className = 'priority';
                initialData.options = propsPriority;
                break;
            case ESelectType.Status:
                initialData.className = 'status';
                initialData.options = propsStatus;
                break;
            case ESelectType.Filter:
                initialData.className = 'filter';
                initialData.options = propsFilter;
                break;
            case ESelectType.Sorting:
                initialData.className = 'sorting';
                initialData.options = propsSorting;
                break;
            default:
                console.error('Select.getOptions: unknow select type');
                initialData.className = 'default';
                initialData.options = {};
        }
        return initialData;
    }

    // Меняет значение и сообщает родителю
    handleChange = (event) => {
        this.setState({
            current: event.target.value
        });
        this.props.setChange(event.target.value);
    }
};

export default Select;