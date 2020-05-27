import React, { PureComponent } from "react";
import { Log } from 'class-logger';

import { EProgressBar, EStatus } from "./consts/enums";


// TODO-ask: где вычислять состояние бара ? И как подписаться на изменения 
// в передаваемую в компонет задачу

// TODO-1 (ProgressBar): подписаться на изменения в задаче
// TODO-2 (ProgressBar): попросить ревью у Павла

// props:
//  type - тип ProgressBar
//  task - задача 
class ProgressBar extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            value: this.calcProgressValue(),
        };
    }

    componentDidUpdate() {
        this.setState({
            value: this.calcProgressValue()
        });
    }

    render() {
        let { type } = this.props;
        let title = 'default title for progress bar';

        if (type === EProgressBar.TimeLimit) title = 'time limit'; 
        if (type === EProgressBar.CompletedTasks) title = 'completed task';

        return (
            <div className="progress-bar">
                <progress 
                    className='progress-bar__scale'  
                    value={ this.state.value }>
                </progress>
                <span className="progress-bar__title">{ title }</span> 
            </div>
        );
    }

    // Вычисляет состояние бара в зависимости от типа
    @Log() 
    calcProgressValue = () => {
        let { task, type } = this.props;

        switch(type) {
            case EProgressBar.TimeLimit:
                let timeLimit = task.timeEnd - task.timeBegin;
                let timeLeft = task.timeEnd - new Date();

                // время вышло
                if (timeLeft < 0) return 100;
                // дата начала задачи еще не наступила 
                if (timeLeft > timeLimit) return 0; 

                // сколько времени прошло в процентах
                return Math.floor(timeLeft * 100 / timeLimit); 
            case EProgressBar.CompletedTasks:
                let taskAmount = task.taskList.length;
                let doneTask = this.countDoneTask();

                if(doneTask > taskAmount) console.error(`invalid amount done task (doneTask: ${doneTask}, taskAmount ${taskAmount})`);
                
                // сколько выполнено в процентах
                return Math.floor(doneTask * 100 / taskAmount);
            default:
                console.error(`Unknow ProgressBar type - ${type}`);
        }

        return 0;
    }

    @Log()
    countDoneTask = () => {
        let { task } = this.props;
        let counter = 0;

        task.taskList.map((value) => {
            if(value.status === EStatus.Done) counter++;
        });

        return counter;
    }

} 

export default ProgressBar;