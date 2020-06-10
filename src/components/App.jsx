import React from 'react';
import './App.css';

import TaskList from './TaskList/TaskList'; 
import TaskFilter from './TaskFilter/TaskFilter';

function App() {
  return (
    <div className="app">
      <TaskFilter></TaskFilter>
      <TaskList></TaskList>
    </div>
  );
}

export default App;
