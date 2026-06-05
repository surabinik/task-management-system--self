import { Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Notifications from './pages/Notifications'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  )
}

export default App