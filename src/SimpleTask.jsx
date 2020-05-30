import React, { Component } from "react";
import { EStatus } from "./consts/enums";
import { numberTest } from "./utils";

// Служит для ображения простого пункта задачи
// Можно будет создать задачу отображаемую в основном списке
// props:
//  taskId - по id задача будет получать для себя данные

// TODO-tmp: SimpleTask data 
// state = {
//     id: ,
//     title: '',
//     status: EStatus.Await
// }
class SimpleTask extends Component {
    constructor(props) {
        super(props);

        let testId = numberTest('taskId', props.taskId, 'SimpleTask.constructor');
        console.debug(`SimpleTask.constructor - taskId: ${props.taskId}, testId: ${testId}`);

        this.state = {
            simpleTask: (testId) 
            ? this.getSimpleTask(props.taskId)
            : this.createNewTask(),
            newTask: testId 
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

                {/* Notice: status менять не планируется */}
                <span className='sl-task__status'>
                    { status }
                </span>
           </div>
        );
    }

    //TODO: SimpleTask.getSimpleTask 
    getSimpleTask = (id) => {

        // tmp - test UI
        return {
            id: 0, 
            title: 'Test simple Task',
            status: EStatus.Await
        } 
    } 

    createNewTask = () => {
        return {
            id: this.getFreeId(), // поле необходимо для связи задачи с SimpleTask и AdvancedTask
            title: 'Write you task title here...',
            status: EStatus.Await
        };
    }

    // TODO: SimpleTask.getFreeId
    // Id должно резервироваться в отдельном хранилище,
    // Только тогда, когда задача будет создана, произойдет запись в БД
    getFreeId = () => {
        // tmp - test UI
        console.debug('SimpleTask.getFreeId - stub id');
        return 1;
    } 
}

export default SimpleTask;