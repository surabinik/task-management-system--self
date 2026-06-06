import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import '../Tasks.css'

function Tasks() {

  const [tasks, setTasks] = useState([
    {
      name: 'Design UI',
      priority: 'High',
      status: 'Pending'
    },
    {
      name: 'Build API',
      priority: 'Medium',
      status: 'In Progress'
    },
    {
      name: 'Testing',
      priority: 'Low',
      status: 'Completed'
    }
  ])

  const [taskName, setTaskName] = useState('')
  const [priority, setPriority] = useState('High')
  const [status, setStatus] = useState('Pending')
  const [editIndex, setEditIndex] = useState(null)

  const addTask = () => {
    if (!taskName) return

    const newTask = {
      name: taskName,
      priority: priority,
      status: status
    }

    if (editIndex !== null) {
      const updatedTasks = [...tasks]

      updatedTasks[editIndex] = newTask

      setTasks(updatedTasks)

      setEditIndex(null)
    } else {
      setTasks([...tasks, newTask])
    }

    setTaskName('')
    setPriority('High')
    setStatus('Pending')
  }

  const deleteTask = (indexToDelete) => {
    setTasks(
      tasks.filter((_, index) => index !== indexToDelete)
    )
  }

  const editTask = (index) => {
    const task = tasks[index]

    setTaskName(task.name)
    setPriority(task.priority)
    setStatus(task.status)

    setEditIndex(index)
  }

  return (
    <>
      <Sidebar />

      <div className="tasks-container">
        <h1>Tasks</h1>

        <div className="task-form">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <button onClick={addTask}>
            {editIndex !== null ? 'Update Task' : 'Add Task'}
          </button>
        </div>

        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => editTask(index)}>
                    Edit
                  </button>

                  <button onClick={() => deleteTask(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </>
  )
}

export default Tasks