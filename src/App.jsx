import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="app" style={{backgroundColor: '#0F1115'}}>
      <Sidebar />
      <div className="main" style={{backgroundColor: '#0F1115'}}>
        <Navbar />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
