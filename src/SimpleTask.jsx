import React, { Component } from "react";

// Служит для ображения простого пункта задачи
// Можно будет создать задачу отображаемую в основном списке
class SimpleTask extends Component {
    // state - нужен для создания новой задачи
    state = {
        title: '',
        status: 0
    }

    render() {
        return (
           <div className='advancedTask'>
                AdvancedTask
                simpleTaskList.map((simpleTask) => 
                    <SimpleTask></SimpleTask>
                )
           </div> 
        );
    }
}

export default SimpleTask;