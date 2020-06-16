import React, { Component } from "react";
import { connect } from 'react-redux';

import './Task.css';
import doge from '../../assets/doge.png';
import { getProperty, getTenDays, numberTest, getStrDate, prepareChangedProp } from '../../utils';
import { EProgressBar, EPriority, EStatus, ESelectType } from "../../consts/enums";
import { taskTypeActions } from "../../consts/actionTypes";

import Select from '../Select/Select';
import ProgressBar from "../ProgressBar/ProgressBar";

//TODO-advanced: придумать механизм умной отправки на сервер 

// Цикл: 
// new Task -> click saveTask -> clisk Task -> new AdvancedTask ->? new SimpleTask ->? new Task ....

// Отображает задачу в главном списке задач. 
// Если нужно создать новую задачу, то используем без передачи props.taskId
// props:
//  task
//  taskId? - свободный Id для создания новой задачи 
//  moveTask - по факту костыль - не знаю как сообщить родителю о сохраннении задачи
class Task extends Component {
    constructor(props) {
        super(props);
        // console.debug('Task.constructor - rawTask', props.task);
        this.state = {
            task: (props.task) ? props.task : this.сreateNewTask(),
            saved: (props.task) ? true : false,
            errors: ''
        }
    }

    // Notice: может перебивать значения из constructor после инициализации
    // Используется для применения изменений с Advanced и Simple task
    // Особенно важен task.taskList для ProgressBar
    static getDerivedStateFromProps(nextProps, prevState) {
        console.debug('Task.getDerivedStateFromProps');
        let newState = prevState;

        //TODO-advanced: каждый раз, при изменении перезаписывает 
        if(nextProps.task && prevState.saved) 
            newState = {
                ...prevState,
                task: prepareTask(nextProps.task)
            };
        
        return newState;
    }

    render() {
        let { task, saved } = this.state; 
        // console.debug(`Task - `, task);
        
        let priority = getProperty('priority', task.priority,
            ['хотелка', 'минимальная', 'средняя', 'важная', 'критическая'], ['wish', 'low', 'medium', 'important', 'crit']
        );
        let status = getProperty('status', task.status,
            ['выполнена', 'ожидает', 'отложена', 'в процессе'], ['done', 'await', 'delayed', 'during']
        );

        return (
            <div className='task' onDoubleClick={ () => saved && this.props.openAdvancedTask() }>
                <div className='task__info'>
                    <div className="task__box">
                        <div className='task__props'>
                            
                            <span onDoubleClick={ this.handleEdit } className={ `task__property task__priority-${priority.class}` }>
                                { priority.title }
                            </span>
                            {!saved &&
                                <Select type={ ESelectType.Priority } 
                                    setChange={(newValue) => this.changeProp('priority', newValue)}/>
                            }
                            
                            <span onDoubleClick={ this.handleEdit } className={ `task__property task__status-${status.class}` }>
                                { status.title }
                            </span>
                            {!saved &&
                                <Select type={ ESelectType.Status } 
                                    setChange={(newValue) => this.changeProp('status', newValue)}/>
                            }

                            {/* TODO-advanced: Select Tags */}
                        </div>
                        
                        <div className="task__btn-box">
                        { !saved &&
                            <button className='task__btn-save' onClick={ this.handleSaveTask }>Сохранить</button>
                        }
                            <button className='task__btn-del' onClick={ this.deleteTask }>Удалить</button>
                        </div>
                    </div>

                    { (saved) 
                        ? <div className='task__title' onDoubleClick={ this.handleEdit }>{task.title}</div>
                        : <input type="text" defaultValue={task.title} onBlur={(e) => this.changeProp('title', e.target.value)}/>
                    }

                    <div className="task__box_doge">
                        <div className="task__progress-bars" onDoubleClick={ this.handleEdit }>
                            <ProgressBar type={EProgressBar.CompletedTasks} task={ task }/>
                            <ProgressBar type={EProgressBar.TimeLimit} task={ task }/>
                            { !saved && 
                                <div className="task__box_edit-time">
                                    <input type='text' defaultValue={getStrDate(task.timeBegin)} className='task__edit-time-begin' 
                                        onBlur={(e) => this.changeProp('timeBegin', e.target.value)}/>   
                                    <input type='text' defaultValue={getStrDate(task.timeEnd)}  className='task__edit-time-end' 
                                        onBlur={(e) => this.changeProp('timeEnd', e.target.value)}/>   
                                </div>
                            }
                        </div>
                        {/* TODO-advance: сделать компонент со случайными действиями (мемы, музыка, смена тем и тд) */}
                        { !saved && (Math.random() - 0.99) > 0 && <img src={doge} 
                                    className='task__doge'
                                    alt="Doge with hat" 
                                    aria-label="Мое увооожение, снимаю перед вами шляпу"
                                    title="Мое увооожение, снимаю перед вами 🎩"/>
                        }
                    </div>
                </div>
            </div>
        )
    }

    // Сохраняет задачу и сообщает родителю
    handleSaveTask = () => {
        let { saveTask, moveTask } = this.props;
        let { errors, task } = this.state;
    
        // TODO-advanced: вынести в отдельный метод (вывод ошибок), хз почему сразу не сделал 
        let handledErr = 0;
        while(errors.length > 0 && handledErr < errors.length) {
            alert(errors[handledErr]);
            if(handledErr + 1 === errors.length) {
                this.setState({
                    errors: []
                });
                return;
            }
        }
        //
    
        // TODO-ask: узнать в каком порядке вызывать:
        //      setState, родительские методы на setState и dispatch
        this.setState({
            saved: true
        });

        moveTask && moveTask();           

        saveTask(task);
        console.info(`task saved, id: ${task.id}`);
    }

    // Удаляет задачу и сообщает родителю
    deleteTask = () => {
        let { delTask, moveTask } = this.props;

        if(moveTask) { // создается новая задача
            moveTask()
        } else { // задача из хранилища
            delTask(this.state.task.id)
            // throw new Error("Err: Task.saveTask - parent function moveTask, does'n exist");
        };
    }

    // Создает новую задачу, если не была передана задача
    сreateNewTask = () => {
        // console.debug('Task.createNewTask');
        numberTest('taskId', this.props.taskId, 'Task.сreateNewTask', true);
        return {
            id: this.props.taskId,
            // type: ETaskType.Full,
            title: 'Название вашей задачи...',
            status: EStatus.Await,
            priority: EPriority.Wish,
            executors: [],
            timeBegin: new Date(),
            timeEnd: new Date(getTenDays(Date.now())), // будет немного больше чем 10 дней (задержка при выполении + 10 дней от текущего времени)
            description: '',
            taskList: []
        };
    }

    // Обновляет значение задачи
    changeProp = (prop, rawValue) => {
        let newValue = prepareChangedProp(prop, rawValue);

        if(newValue.err) {
            // newValue.value - сообщение об ошибке
            alert(newValue.value);
            this.setState((prevState) => {
                return {
                    errors: [...prevState.errors, newValue.value]
                }
            }); 
        } else {
            // newValue.value - значение свойства
            this.setState((prevState) => {
                return {
                    task: {...prevState.task, [prop]: newValue.value}   
                }
            });
        }
    }

    // Тогглер для переключения в режим редактирования    
    handleEdit = (event) => {
        this.setState({
            saved: false
        });
        event.stopPropagation()
    }
}

// Обрабатывает задачу из хранилища
const prepareTask = (rawTask) => {
    if(!rawTask.timeBegin.getDate || !rawTask.timeEnd.getDate) {
        
        let updatedTask = {
            ...rawTask,
            timeBegin: new Date(rawTask.timeBegin),
            timeEnd: new Date(rawTask.timeEnd)
        };
        console.debug('Task.prepareTask - persisted task, updated: ', updatedTask);
        return updatedTask;
    }
    console.debug('Task.prepareTask - ok');
    return rawTask;
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveTask: (task) => {
            dispatch({ type: taskTypeActions.SAVE_TASK, task });
        },
        delTask: (id) => {
            dispatch({ type: taskTypeActions.DEL_TASK, id });
        }
    }
}


export default connect(null, mapDispatchToProps)(Task);
