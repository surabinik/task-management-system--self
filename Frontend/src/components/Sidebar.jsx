import { Link, useNavigate } from 'react-router-dom'
import '../Sidebar.css'

function Sidebar() {

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="sidebar">

      <h2>
        <Link to="/">Task Manager</Link>
      </h2>

      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/projects">Projects</Link>
        </li>

        <li>
          <Link to="/tasks">Tasks</Link>
        </li>

        <li>
          <Link to="/notifications">Notifications</Link>
        </li>

        <li onClick={handleLogout}>
          Logout
        </li>

      </ul>

    </div>
  )
}

export default Sidebar