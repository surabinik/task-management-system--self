import { Link } from 'react-router-dom'
import '../Sidebar.css'

function Sidebar() {
  return (
    <div className="sidebar">
     <h2>
  <Link to="/">Task Manager</Link>
</h2>

      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li>Logout</li>
      </ul>
    </div>
  )
}

export default Sidebar