import { Link, useNavigate } from 'react-router-dom'
import '../Sidebar.css'

function Sidebar() {
  const navigate = useNavigate()

  const role =
    localStorage.getItem('role')

  const handleLogout = () => {
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('role')
    localStorage.removeItem('username')

    navigate('/login')
  }

  return (
    <div className="sidebar">
      <h2>
        <Link to="/dashboard">
          Task Manager
        </Link>
      </h2>

      <ul>

        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/projects">
            Projects
          </Link>
        </li>

        <li>
          <Link to="/tasks">
            Tasks
          </Link>
        </li>

        <li>
          <Link to="/notifications">
            Notifications
          </Link>
        </li>

        {role === 'Admin' && (
          <li>
            <Link to="/users">
              Users
            </Link>
          </li>
        )}

        <li onClick={handleLogout}>
          Logout
        </li>

      </ul>
    </div>
  )
}

export default Sidebar