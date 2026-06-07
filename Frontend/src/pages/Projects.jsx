import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import '../Projects.css'

function Projects() {
  const [projects, setProjects] = useState([])

  const [projectName, setProjectName] = useState('')
  const [status, setStatus] = useState('Active')
  const [startDate, setStartDate] = useState('')

  const [editId, setEditId] = useState(null)

  const [search, setSearch] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/projects'
      )

      const data = await response.json()

      setProjects(data)
    } catch (error) {
      console.log(error)
    }
  }

  const addProject = async () => {
    if (!projectName || !startDate) return

    try {
      if (editId) {
        await fetch(
          `http://localhost:5000/projects/${editId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: projectName,
              status,
              start_date: startDate
            })
          }
        )

        setEditId(null)
      } else {
        await fetch(
          'http://localhost:5000/projects',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: projectName,
              status,
              start_date: startDate
            })
          }
        )
      }

      await loadProjects()

      setProjectName('')
      setStatus('Active')
      setStartDate('')
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProject = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this project?'
      )
    ) {
      return
    }

    try {
      await fetch(
        `http://localhost:5000/projects/${id}`,
        {
          method: 'DELETE'
        }
      )

      await loadProjects()
    } catch (error) {
      console.log(error)
    }
  }

  const editProject = (project) => {
    setProjectName(project.name)
    setStatus(project.status)

    setStartDate(
      project.start_date
        ? project.start_date.split('T')[0]
        : ''
    )

    setEditId(project.id)
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  return (
    <>
      <Sidebar />

      <div className="projects-container">
        <h1>Projects</h1>

        <input
          type="text"
          placeholder="🔍 Search Projects..."
          className="search-box"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="project-form">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option>Active</option>
            <option>Completed</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
          />

          <button onClick={addProject}>
            {editId
              ? 'Update Project'
              : 'Add Project'}
          </button>
        </div>

        <table className="project-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>

                <td>
                  <span
                    className={
                      project.status === 'Completed'
                        ? 'status-completed'
                        : 'status-active'
                    }
                  >
                    {project.status}
                  </span>
                </td>

                <td>
                  {project.start_date
                    ? project.start_date.split('T')[0]
                    : ''}
                </td>

                <td>
                  <button
                    onClick={() =>
                      editProject(project)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteProject(project.id)
                    }
                  >
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

export default Projects