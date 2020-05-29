import React, { Component } from "react";
import { EStatus } from "./consts/enums";

// Служит для ображения простого пункта задачи
// Можно будет создать задачу отображаемую в основном списке
// props:
//  taskId - по id задача будет получать для себя данные
//  newTask - флаг создания новой задачи


// TODO-tmp: SimpleTask data 
// state = {
//     title: '',
//     status: 0
// }
class SimpleTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            simpleTask: (props.newTask) 
            ? this.сreateNewTask(props.taskId)
            : this.getSimpleTask(props.taskId),
        }
    }

    render() {
        let { title, status } = this.state.simpleTask; 
        return (
           <div className='sl-task'>
                <input type="checkbox" 
                    name={`simple_${this.props.taskId}`} 
                    id={`simple_${this.props.taskId}`}/>

                <label htmlFor={`simple_${this.props.taskId}`}>
                    { title }
                </label>

                <span className='sl-task__status'>
                    { status }
                </span>
           </div>
        );
    }

    //TODO: SimpleTask.getSimpleTask 
    getSimpleTask = (taskId) => {

    } 

    createNewTask = (taskId) => {
        return {
            id: taskId, // поле необходимо для связи задачи с SimpleTask и AdvancedTask
            title: '',
            status: EStatus.Await
        };
    }
}

export default SimpleTask;