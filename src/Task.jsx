import React, { Component } from "react";

import PersonSlider from './PersonSlider';

// Цикл: 
// new Task -> new AdvancedTask ->? new SimpleTask ->? new Task ....


// Отображает задачу в главном списке задач
class Task extends Component {
    // state - нужен для создания новой задачи
    state = {
        title: '',
        status: 0, // 0 - ожидает выполнения
        priority: 0, // 0 - минимальный
        executors: [],
        tags: []
    }

    render() {
        let { task } = this.props;

        return (
            <div className='task'>
                <div className='task__info'>
                    {/* TODO: почитать о создании и выборе классов под ситуации */}
                    <div className='task__props'>
                        <span className="">
                            { task.priority }
                            usual
                        </span>
                    </div>

                    <span className='task__title'>Title</span>

                    <div className="task__progress-bars">
                        
                        <div className="task__bar">
                            <progress 
                                className='taks__bar-progress'  
                                value="40">
                            </progress>
                            <span className="task__bar-title title-progress">progress</span> 
                        </div>

                        <div className="task__bar">
                            <progress 
                                className='taks__bar-timelimit'
                                value="40">
                            </progress>
                            <span className="task__bar-title title-timelimit">timelimit</span> 
                        </div>
                    </div>
                </div>
                <PersonSlider persons={ this.state.executors }></PersonSlider>
            </div>
        )
    }
}

export default Task;