import { useState } from 'react';
import './App.css'

const App = () => {
  const localTasks = JSON.parse(localStorage.getItem('tasks'));

  const [name, setName] = useState('');
  const [tasks, setTasks] = useState(localTasks === null ? [] : localTasks);

  localStorage.setItem('tasks', JSON.stringify(tasks));
  let nextId = tasks.length === 0 ? 0 : tasks[tasks.length - 1].id + 1;

  const date = new Date(Date.now());
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function handleDelete(task){
    const tasksDelete = tasks.filter(t => t.id != task.id);
    setTasks(tasksDelete);
  }

  function handleAdd(name,id){
    setTasks([...tasks, {id: id, name: name, isComplete: false}])
    setName('');
  }

  function handleComplete(task){
    task.isComplete = task.isComplete === false ? true : false;
    setTasks([...tasks]);
  }

  function handleClear(){
    setTasks([]);
  }

  return(
    <div className="App">
      <h2>Tasks for {date.getDate()} {months[date.getMonth()]}</h2>
      <div className="card-container">
        <div className="card">
          <ul>
            {tasks.map(task => (
              <li key={task.id} className={`switch ${task.isComplete}`}>
                <p>{task.name}</p>
                <div className="buttons">
                <button onClick={() => handleComplete(task)}>{task.isComplete ? 'Undo' : 'Done'}</button>
                <button onClick={() => handleDelete(task)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          </div>
      </div>
      <div className='addTask'>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Add new task" />
        <button onClick={() =>handleAdd(name, nextId)}>Add</button>
      </div>
      <div className='clearButton'>
            <button onClick={() => handleClear()}>Clear all</button>
      </div>
    </div>
  )
}

export default App
