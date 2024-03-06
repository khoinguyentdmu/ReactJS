import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks"));
    return storageTasks ?? [];
  });

  const handleClick = () => {
    setTasks(prev => {
      const newTasks = [...prev, task];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });

    setTask("");
  }

  const handleDelete = (index => {
    const newTasks = tasks.filter((task, currentIndex) => currentIndex != index);
    setTasks(newTasks);
  })

  return (
    <>
      <div className="box">
        <h1 className="title">To do list</h1>
        <div className="input">
          <input type="text" placeholder="Type here" className="content" onChange={e => setTask(e.target.value)} value={task}></input>
          <input type="button" value="Add" className="button submit" onClick={handleClick}></input>
        </div>
        < ul className="tasks">
          {
            tasks.map((task, index) => (<li key={index}>
              <span>{task}</span>
              <input className="button delete" value="Delete" type="button" onClick={() => handleDelete(index)}></input>
            </li>))
          }
        </ul>
      </div>
    </>
  )
}

export default App
