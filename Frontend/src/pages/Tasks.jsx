
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import '../Tasks.css'

function Tasks() {
  const role = localStorage.getItem('role')
  const username = localStorage.getItem('username')

  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])

  const [taskName, setTaskName] = useState('')
  const [priority, setPriority] = useState('High')
  const [status, setStatus] = useState('Pending')
  const [projectId, setProjectId] = useState('')
  const [assignedUser, setAssignedUser] = useState('')
  const [dueDate, setDueDate] = useState('')

  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadTasks()
    loadProjects()
    loadUsers()
  }, [])

  const loadTasks = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/tasks'
      )

      const data = await response.json()

      if (Array.isArray(data)) {
        setTasks(data)
      } else {
        setTasks([])
      }
    } catch (error) {
      console.log(error)
      setTasks([])
    }
  }

  const loadProjects = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/projects'
      )

      const data = await response.json()

      if (Array.isArray(data)) {
        setProjects(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loadUsers = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/users'
      )

      const data = await response.json()

      if (Array.isArray(data)) {
        setUsers(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const saveTask = async () => {
    if (!taskName) return

    try {
      const taskData = {
        task_name: taskName,
        priority,
        status,
        project_id: projectId || null,
        assigned_user: assignedUser || null,
        due_date: dueDate || null
      }

      if (editId) {
        await fetch(
          `http://localhost:5000/tasks/${editId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type':
                'application/json'
            },
            body: JSON.stringify(taskData)
          }
        )

        setEditId(null)
      } else {
        await fetch(
          'http://localhost:5000/tasks',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json'
            },
            body: JSON.stringify(taskData)
          }
        )
      }

      setTaskName('')
      setPriority('High')
      setStatus('Pending')
      setProjectId('')
      setAssignedUser('')
      setDueDate('')

      loadTasks()
    } catch (error) {
      console.log(error)
    }
  }

  const editTask = (task) => {
    setTaskName(task.task_name)
    setPriority(task.priority)
    setStatus(task.status)

    setProjectId(task.project_id || '')
    setAssignedUser(
      task.assigned_user || ''
    )

    setDueDate(
      task.due_date
        ? task.due_date
            .toString()
            .split('T')[0]
        : ''
    )

    setEditId(task.id)
  }

  const deleteTask = async (id) => {
    if (
      !window.confirm(
        'Delete this task?'
      )
    )
      return

    try {
      await fetch(
        `http://localhost:5000/tasks/${id}`,
        {
          method: 'DELETE'
        }
      )

      loadTasks()
    } catch (error) {
      console.log(error)
    }
  }
const visibleTasks = Array.isArray(tasks)
  ? (
      role === 'Collaborator'
        ? tasks.filter(
            task =>
              task.assigned_username === username
          )
        : tasks
    )
  : []

const filteredTasks = visibleTasks.filter(
  (task) =>
    task.task_name
      .toLowerCase()
      .includes(search.toLowerCase())
)


  return (
    <>
      <Sidebar />

      <div className="tasks-container">
        <h1>Tasks</h1>

        <input
          className="search-box"
          type="text"
          placeholder="🔍 Search Tasks..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        {(role === 'Admin' ||
          role ===
            'Project Manager') && (
          <div className="task-form">
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) =>
                setTaskName(
                  e.target.value
                )
              }
            />

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >
              <option>Pending</option>
              <option>
                In Progress
              </option>
              <option>
                Completed
              </option>
            </select>

            <select
              value={projectId}
              onChange={(e) =>
                setProjectId(
                  e.target.value
                )
              }
            >
              <option value="">
                Select Project
              </option>

              {projects.map(
                (project) => (
                  <option
                    key={
                      project.id
                    }
                    value={
                      project.id
                    }
                  >
                    {project.name}
                  </option>
                )
              )}
            </select>

            <select
              value={assignedUser}
              onChange={(e) =>
                setAssignedUser(
                  e.target.value
                )
              }
            >
              <option value="">
                Assign User
              </option>

              {users.map(
                (user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {
                      user.username
                    }
                  </option>
                )
              )}
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(
                  e.target.value
                )
              }
            />

            <button
              onClick={saveTask}
            >
              {editId
                ? 'Update Task'
                : 'Add Task'}
            </button>
          </div>
        )}

        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Project</th>
                <th>
                  Assigned User
                </th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>

                {role !==
                  'Collaborator' && (
                  <th>
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map(
                (task) => (
                  <tr
                    key={task.id}
                  >
                    <td>
                      {
                        task.task_name
                      }
                    </td>

                    <td>
                      {task.project_name ||
                        '-'}
                    </td>

                    <td>
                      {task.assigned_username ||
                        '-'}
                    </td>

                    <td>
                      {task.due_date
                        ? task.due_date
                            .toString()
                            .split(
                              'T'
                            )[0]
                        : '-'}
                    </td>

                    <td>
                      <span
                        className={
                          task.priority ===
                          'High'
                            ? 'priority-high'
                            : task.priority ===
                              'Medium'
                            ? 'priority-medium'
                            : 'priority-low'
                        }
                      >
                        {
                          task.priority
                        }
                      </span>
                    </td>

                    <td>
                      {task.status}
                    </td>

                    {role !==
                      'Collaborator' && (
                      <td className="action-buttons">
                        <button
                          onClick={() =>
                            editTask(
                              task
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteTask(
                              task.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Tasks