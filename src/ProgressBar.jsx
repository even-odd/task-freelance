import React, { Component } from "react";

import { EProgressBar, EStatus } from "./consts/enums";

import { getDays } from './utils';

// TODO-ask: где вычислять состояние бара ? И как подписаться на изменения 
// в передаваемую в компонет задачу

// TODO-1 (ProgressBar): подписаться на изменения в задаче
// TODO-2 (ProgressBar): попросить ревью у Павла

// props:
//  type - тип ProgressBar
//  task - задача 
class ProgressBar extends Component {

    // TODO: ProgressBar.shouldComponentUpdate
    shouldComponentUpdate() {
        // сравнивать по времени и задачам,
        // сравнения по типам вынести в отдельные функции 
        return true;
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
        if (type === EProgressBar.TimeLimit) title = 'time limit'; 
        if (type === EProgressBar.CompletedTasks) title = 'completed task';

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
    // @Log() 
    calcProgressValue = () => {
        let { task, type } = this.props;
        let range = {
            current: 0,
            end: 100, 
        }

        if (task === undefined) {
            console.error(`Err: ProgressBar.calcValue - task does'n exist`);
            return 0;
        }

        switch(type) {
            // TODO: получилось запутанно, переделать
            case EProgressBar.TimeLimit:
                let timeLimit = getDays(task.timeEnd - task.timeBegin);
                // времени осталось
                let timeLeft = timeLimit - (timeLimit - getDays(task.timeEnd - Date.now()));
                
                // console.debug(`ProgressBar.calcValue (timeBegin: ${task.timeBegin}, timeEnd: ${task.timeEnd})`);
                // console.debug(`ProgressBar.calcValue (timeLimit: ${timeLimit}, timeLeft: ${timeLeft})`);
                
                // время вышло
                if (timeLeft < 0) {
                    console.debug('ProgressBar.calcValue - time out - 100');
                    range.current = 100;
                    break;
                }
                // дата начала задачи еще не наступила 
                if (timeLeft > timeLimit) {
                    console.debug('ProgressBar.calcValue - early date - 0');
                    break;
                } 

                // сколько времени прошло в процентах
                range.current = Math.floor((timeLimit - timeLeft) * 100 / timeLimit);
                // console.debug(`ProgressBar.calcValue - floor - ${range.current}%`);
                break;
            case EProgressBar.CompletedTasks:
                let tmpTaskList = [
                    {status: EStatus.Done},
                    {status: EStatus.Await},
                    {status: EStatus.Done},
                    {status: EStatus.Await},
                    {status: EStatus.Done},
                ];

                let taskAmount = tmpTaskList.length;
                // let taskAmount = task.taskList.length;
                let doneTask = this.countDoneTask();

                if(doneTask > taskAmount) {
                    console.error(`Err: Invalid amount done task (doneTask: ${doneTask}, taskAmount ${taskAmount})`);
                    break;
                }                
                // сколько выполнено в процентах
                range.current = Math.floor(doneTask * 100 / taskAmount);
                console.debug(`ProgressBar.calcValue - floor - ${range.current}%`);
                break;
            default:
                console.error(`Err: Unknow ProgressBar type - ${type}`);
        }

        return range;
    }

    // @Log()
    countDoneTask = () => {
        let { task } = this.props;
        let counter = 0;

        let tmpTaskList = [
            {status: EStatus.Done},
            {status: EStatus.Await},
            {status: EStatus.Done},
            {status: EStatus.Await},
            {status: EStatus.Done},
        ];

        tmpTaskList.map((value) => {
            if(value.status === EStatus.Done) counter++;
        });

        //TODO: Action - getDoneTask
        // task.taskList.map((value) => {
        //     if(value.status === EStatus.Done) counter++;
        // });

        return counter;
    }

} 

export default ProgressBar;