import React, { Component } from "react";

import { Task } from './Task';


// Является представлением для задач.
// Позволяет создавать задачи без записи в БД 
// (они сохраняются после события сохранения в самой задаче)
class TaskList extends Component {
    state = {
        taskList: this.getTaskList(20),
        unsavedTask: 0
    };

    render() {
        return (
            <div className="task-list__box">
                <div className="task-list__addTask" onClick={ this.addNewTask }>
                    {/* eee Emoji-life eee */}
                    <span className='task-list__iconPlus' role='img'>➕</span>
                </div>
                <div className="task-list">
                    { 
                        this.state.taskList.map((task) => 
                        <Task taskId={ task.id } key={ task.id }></Task>    
                        )
                    }

                    {   // Warn: Убогое значение key
                        Array.apply(null, { length: this.state.unsavedTask }).map((el, index) => 
                        <Task key={ index } taskSaved={ this.taskSaved }></Task>
                        )
                    }
                </div>
            </div>
        );
    }

    //TODO: TaskList.getTaskList 
    getTaskList = (taskAmount) => {
        // получает данные с помощью dispatch и возвращает их
        // PS пока хз как dispatch передает нам данные
    }

    addNewTask = () => {
        this.setState((prevState) => {
            return {
                unsavedTask: prevState.unsavedTask + 1
            };
        });
    }

    // Не знаю как иначе сообщить родительскому компоненту о сохранении задачи
    taskSaved = () => {
        this.setState((prevState) => {
            return {
                unsavedTask: prevState.unsavedTask - 1
            };
        });
    }
}

export default TaskList;