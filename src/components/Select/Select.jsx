import React, { Component } from 'react';

import { ESelectType, propsPriority, propsStatus, propsFilter, propsSorting } from '../../consts/enums';
import { numberTest } from '../../utils';

// Select в виде велосипеда
//props:
// type: ESelectTypes
// current - текущее значение
// setChange - функция для оповещения родителя
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
            type: props.type,
            current: (props.current) ? props.current : '',
            data: getData(props.type)
        };
    }

    // для обновления 
    static getDerivedStateFromProps(nextProps, prevState) {
        let res = null;
        if (prevState.type !== nextProps.type) res = {
            ...prevState,
            data: getData(nextProps.type)
        }; 
        
        return res;
    }
   
    render() { 
        let { current, data } = this.state;
    
        // проверка на undefined
        current = (current) ? current : '';
        return (
            <>
                { (data.options.length > 0) &&
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
                }
            </>
        );
    }

    // Меняет значение и сообщает родителю
    handleChange = (event) => {
        this.setState({
            current: event.target.value
        });
        this.props.setChange(event.target.value);
    }
};

// Инициализируем выбор для select 
const getData = (type) => {
    let initialData = {
        className: '',
        options: []
    };

    switch(type) {
        case ESelectType.None :
            initialData.className = 'none';
            break;
        case ESelectType.Executor :
            initialData.className = 'executor';
            break;
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
    }

    // console.debug('Select.getData - data:', initialData);
    return initialData;
}

export default Select;