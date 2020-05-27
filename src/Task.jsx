import React, { Component } from "react";

import { getTenDays } from "./consts/anythings";

import PersonSlider from './PersonSlider';
import ProgressBar from "./ProgressBar";
import { EProgressBar } from "./consts/enums";

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
        tags: [],
        timeBegin: new Date(),
        //будет немного болше чем 10 дней (задержка при выполении + 10 дней от текущего времени)
        timeEnd: getTenDays(new Date())
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
                        <ProgressBar type={EProgressBar.CompletedTasks} task={this.state}></ProgressBar>
                        <ProgressBar type={EProgressBar.TimeLimit} task={this.state}></ProgressBar>
                    </div>
                </div>
                <PersonSlider persons={ this.state.executors }></PersonSlider>
            </div>
        )
    }
}

export default Task;