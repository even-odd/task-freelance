import React, { Component } from "react";
import { connect } from 'react-redux';

import './TaskList.css';    
import { getTaskList } from '../../selectors';
import { getFreeId } from "../../utils";

import Task from '../Task/Task';
import AdvancedTask from '../Task/AdvancedTask/AdvancedTask';

// Является представлением для задач.
// Позволяет создавать задачи без записи в БД 
// (они сохраняются после события сохранения в самой задаче)
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // visibleTask: 20, // TODO-advance: оптимизация для более быстрого рендера
            unsavedTask: [],
            openedAdvanced: -1
        };
    }

    render() {
        let { tasks } = this.props;
        let { unsavedTask, openedAdvanced } = this.state;

        let toOpen = (openedAdvanced < 0) ? -1 : tasks.findIndex((task) => {
            if(task.id === openedAdvanced) return true;

            return false;
        });

        // console.debug('TaskList: tasks to Render - ', tasks);
        // console.debug('TaskList: unsavedTask - ', unsavedTask);
        return (
            <div className="task-list__box">
                <div className="task-list__addTask" onClick={ this.addNewTask }>
                    {/* eee Emoji-life eee */}
                    <div className='task-list__iconAdd'>
                        <span role='img' aria-label='add task'>➕</span>
                    </div>
                </div>
                <div className="task-list">
                    { 
                        tasks.map((task) => 
                            <Task task={ task } key={ task.id } 
                                  openAdvancedTask={() => this.openAdvancedInfo(task.id)}/>
                        ) 
                    }

                    {
                        unsavedTask.map((id) => 
                            <Task key={ `usaved_${id}` } taskId={ id } 
                                  moveTask={ () => this.taskMoved(id) } />
                        )
                    }
                </div>
                <div className="advanced-box">
                    { toOpen > -1 &&
                        <AdvancedTask task={ tasks[toOpen] } />
                    }
                </div>
            </div>
        );
    }

    // Создает новую задачу путем обновления usavedTask
    // usavedTask рендерится отдельно от tasks
    // Триггерит создание Task без параментров - а Task уже создает задачу и сохраняет её
    addNewTask = () => {
        let { tasks } = this.props; 
        let { unsavedTask } = this.state;
        
        let taskIds = tasks.map((task) => task.id);
        let allId = [...taskIds, ...unsavedTask];

        this.setState((prevState) => {
            return {
                unsavedTask: [...prevState.unsavedTask, getFreeId(allId)] 
            };
        });
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

    openAdvancedInfo = (taskId) => {
        this.setState({
            openedAdvanced: taskId 
        });
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: getTaskList(state)
    }
};

export default connect(mapStateToProps)(TaskList);