import React, { PureComponent } from "react";
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Task.css';
import doge from '../../assets/doge.png';
import { getProperty, getTenDays, numberTest, getStrDate, prepareChangedProp } from '../../utils';
import { EProgressBar, EPriority, EStatus, ETaskType, ESelectType } from "../../consts/enums";
import { taskTypeActions } from "../../consts/actionTypes";
// import taskActions from '../../actions/taskActions';

import Select from '../Select/Select';
import PersonSlider from '../Person/PersonSlider/PersonSlider';
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
class Task extends PureComponent {
    constructor(props) {
        super(props);
        // console.debug('Task: ActionsForTask - ', props.actions);
        this.state = {
            task: (props.task) ? props.task : this.сreateNewTask(),
            saved: (props.task) ? true : false,
            errors: ''
        }
    }

    render() {
        let { task, saved } = this.state; 
        // console.debug(`Task - `, task);
        let priority = getProperty('priority', task.priority,
            ['wish', 'low', 'medium', 'important', 'crit']
        );
        let status = getProperty('status', task.status,
            ['done', 'await', 'delaye', 'during']
        );

        return (
            <div className='task' onClick={ () => this.openAdvancedTask(task.id) }>
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
                            <button className='task__btn-save' onClick={ this.handleSaveTask }>Save Task</button>
                        }
                            <button className='task__btn-del' onClick={ this.deleteTask }>Delete Task</button>
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

                {/* TODO-advanced: Change Executors */}
                <div className="task__executors">
                    {/*  
                    { (!saved) 
                        ? <PersonSlider persons={ task.executors }/>
                        : <Person/> 
                     */}
                    
                </div>               
            </div>
        )
    }
    //TODO: Task.openAdvancedTask 
    openAdvancedTask = (id) => {

    }

    // Сохраняет задачу и сообщает родителю
    handleSaveTask = () => {
        // console.debug('Task.handleSaveTask - begin');
        let { saveTask, moveTask } = this.props;
        let { errors } = this.state;
    
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

        saveTask(this.state.task);
        // console.debug('Task.handleSaveTask - end');
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
            id: this.props.taskId, // поле необходимо для связи задачи с SimpleTask и AdvancedTask
            taskType: ETaskType.Full,
            title: 'Write your task title here....',
            status: EStatus.Await,
            priority: EPriority.Wish,
            executors: [],
            timeBegin: new Date(),
            timeEnd: new Date(getTenDays(Date.now())) // будет немного больше чем 10 дней (задержка при выполении + 10 дней от текущего времени)
        };
    }

    // Обновляет значение задачи
    changeProp = (prop, rawValue) => {
        let newValue = prepareChangedProp(prop, rawValue);

        if(newValue.err) {
            alert(newValue.value);
            this.setState((prevState) => {
                return {
                    errors: [...prevState.errors, newValue.value]
                }
            }); 
        } else {
            this.setState((prevState) => {
                return {
                    task: function() {
                        let editedTask = {...prevState.task, [prop]: newValue.value};
                        console.debug('\n', 'TASK: Почему 2 раза рендер?');
                        console.debug('Task.changeProp editedTask:', editedTask);
                        return editedTask;
                    }()    
                }
            });
        }
    }

    // Тогглер для переключения в режим редактирования    
    handleEdit = () => {
        this.setState({
            saved: false
        });
    }
    
}

// const mapDispatchToProps = (dispatch) => bindActionCreators(taskActions, dispatch);
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
