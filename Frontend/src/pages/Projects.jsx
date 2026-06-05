import Sidebar from '../components/Sidebar'
import '../Projects.css'

function Projects() {
  return (
    <>
      <Sidebar />

      <div className="projects-container">
        <h1>Projects</h1>

        <button className="create-project-btn">
          Create Project
        </button>

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
            <tr>
              <td>Website Development</td>
              <td>Active</td>
              <td>2026-06-01</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>

            <tr>
              <td>Mobile App</td>
              <td>Active</td>
              <td>2026-06-05</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>

            <tr>
              <td>Research Project</td>
              <td>Completed</td>
              <td>2026-05-20</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Projects