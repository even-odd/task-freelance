import React, { Component } from "react";

import SimpleTask from "./SimpleTask";

import { numberTest } from './utils';
// Выводит расширенную информацию о задачи по типу Jira
// props:
//  parentId - у AdvancedTask всегда должен быть родитель
//  newTask? - необходимо. Просто смирись
class AdvancedTask extends Component {
    constructor(props) {
        super(props);

        numberTest('parentId', props.parentId, 'AdvancedTask.constructor', true);
        
        console.debug(`AdvancedTask.constructor - parentId: ${props.parentId}, newTask: ${props.newTask}`);

        this.state = {
            adTask: (props.newTask) 
            ? this.createNewTask(props.parentId)
            : this.getAdvancedTask(props.parentId),
        }
    }

    render() {
        let { description, taskList } = this.state.adTask;

        return (
           <div className='ad-task'>
                <div className="ad-task__description">
                    { description }
                </div>
                
                <div className='ad-task__task-list'>
                { 
                    taskList.map((simpleTask) => 
                    <SimpleTask taskId={ simpleTask } key={ simpleTask }></SimpleTask>
                    )
                }
                </div>
           </div> 
        );
    }

    //TODO: AdvancedTask.getAdvancedTask 
    getAdvancedTask = (taskId) => {
        // tmp - test UI
        return {
            id: taskId, // поле необходимо для связи задачи с SimpleTask и AdvancedTask
            description: 'Write Here...',
            taskList: [10, 11, 12]
        } 
    }

    createNewTask = (taskId) => {
        return {
            id: taskId, // поле необходимо для связи задачи с SimpleTask и AdvancedTask
            description: 'Create new AdvancedTask',
            taskList: []
        };
    }
}

export default AdvancedTask;