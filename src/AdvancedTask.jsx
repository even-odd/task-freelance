import React, { Component } from "react";
import SimpleTask from "./SimpleTask";

// Выводит расширенную информацию о задачи по типу Jira
class AdvancedTask extends Component {
    state = {
        description: '',
        taskList: []
    }

    render() {
        let { simpleTaskList, description } = this.props;
        return (
           <div className='ad-task'>
                AdvancedTask
                <div className="ad-task__description">
                    { description }
                </div>
                
                simpleTaskList.map((simpleTask) => 
                    <SimpleTask></SimpleTask>
                )
           </div> 
        );
    }
}

export default AdvancedTask;