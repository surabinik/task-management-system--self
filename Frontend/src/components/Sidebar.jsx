import { Link, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {
  FaChartPie,
  FaFolder,
  FaTasks,
  FaBell,
  FaUsers,
  FaSignOutAlt
} from 'react-icons/fa'
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
        <NavLink to="/dashboard">
          Task Manager
        </NavLink>
      </h2>

      <ul>

  <li>
    <NavLink to="/dashboard">
      <FaChartPie />
      <span>Dashboard</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/projects">
      <FaFolder />
      <span>Projects</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/tasks">
      <FaTasks />
      <span>Tasks</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/notifications">
      <FaBell />
      <span>Notifications</span>
    </NavLink>
  </li>

  {role === 'Admin' && (
    <li>
      <NavLink to="/users">
        <FaUsers />
        <span>Users</span>
      </NavLink>
    </li>
  )}

  <li className="logout-btn" onClick={handleLogout}>
  <FaSignOutAlt />
  <span>Logout</span>
</li>

</ul>
    </div>
  )
}

export default Sidebar