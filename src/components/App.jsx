import React from 'react';

import './App.css';

import TaskFilter from './TaskFilter/TaskFilter';
import TaskList from './TaskList/TaskList'; 

function App() {
  return (
    <div className="app">
      <TaskFilter/>
      <TaskList/>
    </div>
  );
}

export default App;
