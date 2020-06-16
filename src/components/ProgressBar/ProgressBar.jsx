import React, { PureComponent } from "react";

import { EProgressBar } from "../../consts/enums";

import { getDays } from '../../utils';

// TODO-advanced: проверить как происходит рендер после изменения задачи
// (для calcProgressValue) 

// props:
//  type - тип ProgressBar
//  task - задача 
class ProgressBar extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: calcValue(props) 
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        let newState = null;
        
        if(nextProps.type === EProgressBar.CompletedTasks) {
            let doneTasks = countDoneTask(nextProps.task.taskList);
            if(doneTasks !== prevState.value ) 
                newState = {
                    value: doneTasks
                };
        }
        if(nextProps.type === EProgressBar.TimeLimit) {
            let today = new Date().getDate();
            if(today !== prevState.value) 
                newState = {
                    value: today
                };
        }

        return newState;
    }

    render() {
        let { type } = this.props;
        // TODO-ask: как думаешь, лучше это делать здесь или 
        // в constructor и componentDidUpdate
        // с помощью shouldComponentUpdate можно проверить
        // изменились ли props и не делать перерендер в componentDidUpdate, 
        // сделав тут подсчет 
        let range = this.calcProgressValue();

        let title = 'default title for progress bar';
        if (type === EProgressBar.TimeLimit) title = 'срок выполнения'; 
        if (type === EProgressBar.CompletedTasks) title = 'состояние задачи';

        return (
            <div className="progress-bar">
                <progress 
                    className='progress-bar__scale'  
                    value={ range.current }
                    max={ range.end }>
                </progress>
                <span className="progress-bar__title">{ title }</span> 
            </div>
        );
    }

    // Вычисляет состояние бара в зависимости от типа
    calcProgressValue = () => {
        let { task, type } = this.props;
        let range = {
            current: 0,
            end: 100, 
        }

        if (!task) {
            console.error(`Err: ProgressBar.calcProgressValue - task does'n exist`);
            return 0;
        }

        switch(type) {
            // TODO-advanced: получилось запутанно, переделать
            case EProgressBar.TimeLimit:
                let { timeBegin, timeEnd } = task;
                let timeLimit = getDays(timeEnd - timeBegin);
                let timeLeft = timeLimit - (timeLimit - getDays(timeEnd - Date.now())); // времени осталось
                
                if (timeLeft < 0) { // время вышло
                    console.debug('ProgressBar.calcProgressValue - time out - 100');
                    range.current = 100;
                    break;
                }
                
                if (timeLeft > timeLimit) { // дата начала задачи еще не наступила 
                    console.debug('ProgressBar.calcProgressValue - early date - 0');
                    break;
                } 

                // сколько времени прошло в процентах
                range.current = Math.floor((timeLimit - timeLeft) * 100 / timeLimit);
                break;
            case EProgressBar.CompletedTasks:
                // защита от Infinity
                if(task.taskList.length <= 0) break;
                let doneTask = this.state.value;

                // сколько выполнено в процентах
                range.current = Math.floor(doneTask * 100 / task.taskList.length);
                break;
            default:
                console.error(`Err: Unknow ProgressBar type - ${type}`);
        }

        return range;
    }
} 

// Вычисляет значение для getDerivedStateFromProps (для сравнения с новыми пропсами)
const calcValue = (props) => {
    let { task, type } = props;
    let value;

    switch(type) {
        case EProgressBar.TimeLimit:
            value = new Date().getDate();
            break;
        case EProgressBar.CompletedTasks:
            value = countDoneTask(task.taskList);
            break;
        default:
            console.error(`Err: Unknow ProgressBar type - ${type}`);
    }

    return value;
}

// Подсчитывает количество выполненных задач 
// args:
//  tasks - список подзадач
const countDoneTask = (tasks) => {
    let counter = 0;

    tasks.map((task) => {
        task.status && counter++;
    });

    return counter;
}
export default ProgressBar;