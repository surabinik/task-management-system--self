import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import '../Projects.css'

function Projects() {

  const [projects, setProjects] = useState([
    {
      name: 'Website Development',
      status: 'Active',
      date: '2026-06-01'
    },
    {
      name: 'Mobile App',
      status: 'Active',
      date: '2026-06-05'
    },
    {
      name: 'Research Project',
      status: 'Completed',
      date: '2026-05-20'
    }
  ])

  const [projectName, setProjectName] = useState('')
  const [status, setStatus] = useState('Active')
  const [startDate, setStartDate] = useState('')

  const addProject = () => {
    if (!projectName || !startDate) return

    const newProject = {
      name: projectName,
      status: status,
      date: startDate
    }

    setProjects([...projects, newProject])

    setProjectName('')
    setStatus('Active')
    setStartDate('')
  }

  const deleteProject = (indexToDelete) => {
    setProjects(
      projects.filter((_, index) => index !== indexToDelete)
    )
  }

  return (
    <>
      <Sidebar />

      <div className="projects-container">
        <h1>Projects</h1>

        <div className="project-form">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Active</option>
            <option>Completed</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <button onClick={addProject}>
            Add Project
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
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.name}</td>
                <td>{project.status}</td>
                <td>{project.date}</td>
                <td>
                  <button>Edit</button>

                  <button
                    onClick={() => deleteProject(index)}
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