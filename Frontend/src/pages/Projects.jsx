import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import '../Projects.css'

function Projects() {
  const role = localStorage.getItem('role')

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
              'Content-Type':
                'application/json'
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
              'Content-Type':
                'application/json'
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

const toggleProjectStatus = async (
  project
) => {

  const action =
    project.status === 'Archived'
      ? 'restore'
      : 'archive'

  if (
    !window.confirm(
      `Are you sure you want to ${action} this project?`
    )
  ) {
    return
  }

  try {
    const newStatus =
      project.status === 'Archived'
        ? 'Active'
        : 'Archived'

    await fetch(
      `http://localhost:5000/projects/${project.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type':
            'application/json'
        },
        body: JSON.stringify({
          name: project.name,
          status: newStatus,
          start_date:
            project.start_date?.split(
              'T'
            )[0] ||
            project.start_date
        })
      }
    )

    await loadProjects()
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

  const filteredProjects =
    projects.filter((project) =>
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

        {(role === 'Admin' ||
          role ===
            'Project Manager') && (
          <div className="project-form">
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) =>
                setProjectName(
                  e.target.value
                )
              }
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >
              <option>Active</option>
              <option>
                Completed
              </option>
              <option>
                Archived
              </option>
            </select>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
            />

            <button
              onClick={addProject}
            >
              {editId
                ? 'Update Project'
                : 'Add Project'}
            </button>
          </div>
        )}

        <div className="project-table-card">
  <table className="project-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
              <th>Start Date</th>
<th>Progress</th>
<th>Actions</th>
            </tr>
          </thead>

          <tbody>
  {filteredProjects.map(
    (project) => {

      const progress =
        project.total_tasks > 0
          ? Math.round(
              (project.completed_tasks /
                project.total_tasks) *
                100
            )
          : 0

      return (
        <tr key={project.id}>
                  <td>
                    {project.name}
                  </td>

                  <td>
                    <span
                      className={
                        project.status ===
                        'Completed'
                          ? 'status-completed'
                          : project.status ===
                            'Archived'
                          ? 'status-archived'
                          : 'status-active'
                      }
                    >
                      {project.status === 'Active' && '🟢 Active'}
{project.status === 'Completed' && '🔵 Completed'}
{project.status === 'Archived' && '⚫ Archived'}
                    </span>
                  </td>

                  <td>
                    {project.start_date
                      ? project.start_date.split(
                          'T'
                        )[0]
                      : ''}
                  </td>

                  <td>
  <div className="progress-wrapper">

    <div className="project-progress-bar">
      <div
        className="project-progress-fill"
        style={{
          width: `${progress}%`
        }}
      />
    </div>

    <span>{progress}%</span>

  </div>
</td>

                  <td>
                   {(role === 'Admin' ||
  role === 'Project Manager') &&
  project.status !== 'Archived' && (
    <button
      onClick={() =>
        editProject(project)
      }
    >
      Edit
    </button>
)}
                    {role ===
                      'Admin' && (
                      <button
                        onClick={() =>
                          deleteProject(
                            project.id
                          )
                        }
                      >
                        Delete
                      </button>
                    )}

                    {role ===
                      'Project Manager' && (
                      <button
  onClick={() =>
    toggleProjectStatus(project)
  }
>
  {project.status === 'Archived'
    ? 'Restore'
    : 'Archive'}
</button>
                    )}
                  </td>
             </tr>
      )
    }
  )}
          </tbody>
         </table>
</div>
      </div>
    </>
  )
}

export default Projects