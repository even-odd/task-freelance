import React, { Component } from "react";
import { connect } from 'react-redux';

import './TaskList.css';    
import { getTaskList } from '../../selectors';

import Task from '../Task/Task';
import { getFreeId } from "../../utils";


// Является представлением для задач.
// Позволяет создавать задачи без записи в БД 
// (они сохраняются после события сохранения в самой задаче)
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // visibleTask: 20, // TODO-advance: оптимизация для более быстрого рендера
            unsavedTask: []
        };
    }

    render() {
        let { tasks } = this.props;
        let { unsavedTask } = this.state;
        console.debug('TaskList: tasks to Render - ', tasks);
        // console.debug('TaskList: unsavedTask - ', unsavedTask);
        return (
            <div className="task-list__box">
                <div className="task-list__addTask" onClick={ this.addNewTask }>
                    {/* eee Emoji-life eee */}
                    <div className='task-list__iconAdd'>
                        <span role='img' aria-label='addTask'>➕</span>
                    </div>
                </div>
                <div className="task-list">
                    { 
                        tasks.map((task) => {
                            return (<Task task={ task } key={ task.id } ></Task>); 
                        })
                    }

                    {
                        unsavedTask.map((id) => 
                        <Task key={ `usaved_${id}` } taskId={ id } moveTask={ () => this.taskMoved(id) }></Task>
                        )
                    }
                </div>
            </div>
        );
    }

    // Создает новую задачу путем обновления usavedTask
    // usavedTask рендерится отдельно от tasks
    // Триггерит создание Task без параментров - а Task уже создает задачу и сохраняет её
    addNewTask = () => {
        // console.debug('TaskList.addNewTask - begin');
        let { tasks } = this.props; 
        let { unsavedTask } = this.state;

        let taskIds = tasks.map((task) => task.id);
        // console.debug('TaskList.addNewTask - taskId:', taskIds);
        // console.debug('TaskList.addNewTask - unsavedTask:', unsavedTask);
        let allId = [...taskIds, ...unsavedTask];
        // console.debug('TaskList.addNewTask - allId:', allId);
        this.setState((prevState) => {
            return {
                unsavedTask: [...prevState.unsavedTask, getFreeId(allId)] 
            };
        });
        // console.debug('TaskList.addNewTask - end\n ');
    }

    // Не знаю как иначе 
    // Cообщает родительскому компоненту о сохранении задачи
    taskMoved = (moved) => {
        // console.debug(`TaskList.taskMoved(event from Task, id ${moved})`);
        
        this.setState((prevState) => {
            return {
                unsavedTask: prevState.unsavedTask.filter((unsavedTask) => unsavedTask !== moved)
            };
        });
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: getTaskList(state)
    }
};

export default connect(mapStateToProps)(TaskList);