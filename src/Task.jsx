import React, { Component } from "react";

import { getProperty, getTenDays } from './utils';

import PersonSlider from './PersonSlider';
import ProgressBar from "./ProgressBar";
import { EProgressBar, EPriority, EStatus } from "./consts/enums";


// TODO-1-ask: (Task) как правильно сделать изменение значения ?
// TODO-2-ask: (Task) как происходит обновление компонента после dispatch ?

// Цикл: 
// new Task -> new AdvancedTask ->? new SimpleTask ->? new Task ....

// Отображает задачу в главном списке задач. 
// Если нужно создать новую задачу, то используем без передачи props.taskId
// props:
//  taskId - по id задача будет получать для себя данные
//  taskSaved - по факту костыль - не знаю как сообщить родителю о сохраннении задачи
class Task extends Component {
    constructor(props) {
        super(props);
        let testId = props.taskId != null || props.taskId > -1;
        console.debug(`Task.constructor - taskId: ${props.taskId}, testId: ${testId}`);

        this.state = {
            task: (testId) ? this.getTask(props.taskId) : this.сreateNewTask(),
            newTask: !testId
        }
    }

    render() {
        let { task } = this.state; 
        let priority = getProperty('priority', task.priority,
            ['wish', 'low', 'medium', 'important', 'crit']
        );
        return (
            <div className='task' onClick={ () => this.openAdvancedTask(task.id) }>
                <div className='task__info'>
                    <div className='task__props'>
                        {/* TODO: Select Priority */}
                        <span className={ priority.class }>
                            { priority.title }
                        </span>

                        {/* TODO-advanced: Select Tags */}
                    </div>

                    {/* TODO: Change Title */}
                    <span className='task__title'>Title</span>

                    <div className="task__progress-bars">
                        <ProgressBar type={EProgressBar.CompletedTasks} task={ task }></ProgressBar>
                        <ProgressBar type={EProgressBar.TimeLimit} task={ task }></ProgressBar>
                    </div>
                </div>

                {/* TODO: Change Executors */}
                <PersonSlider persons={ task.executors }></PersonSlider>

                { this.state.newTask && 
                    <button className='task__btn-save' onClick={ this.saveTask }>Save Task</button>
                }
            </div>
        )
    }
    //TODO: Task.openAdvancedTask 
    openAdvancedTask = (id) => {

    }

    //TODO: Task.getTask 
    getTask = (id) => {
        // получает данные с помощью dispatch и возвращает их
        // PS пока хз как dispatch передает нам данные
        // tmp - stub
        return {
            id: id, // поле необходимо для связи задачи с SimpleTask и AdvancedTask
            title: '',
            status: EStatus.Await,
            priority: EPriority.Wish,
            executors: [],
            tags: [],
            timeBegin: Date.parse('2020-05-30'),
            timeEnd: Date.parse('2020-06-05') // будет немного больше чем 10 дней (задержка при выполении + 10 дней от текущего времени)
        };
    }

    //TODO: Task.saveTask 
    saveTask = () => {
        // dispatch(saveTask(this.state.task));

        if(this.props.taskSaved) {
            this.props.taskSaved()
        } else {
            throw new Error("Err: Task.saveTask - parent funciton taskSaved, does'n exist");
        };
    }

    сreateNewTask = () => {
        return {
            id: this.getFreeId(), // поле необходимо для связи задачи с SimpleTask и AdvancedTask
            title: '',
            status: EStatus.Await,
            priority: EPriority.Wish,
            executors: [],
            tags: [],
            timeBegin: Date.now(),
            timeEnd: getTenDays(Date.now()) // будет немного больше чем 10 дней (задержка при выполении + 10 дней от текущего времени)
        };
    }

    // TODO: Task.getFreeId
    // Id должно резервироваться в отдельном хранилище,
    // Только тогда, когда задача будет создана, произойдет запись в БД
    getFreeId = () => {
         
    }  
}

export default Task;