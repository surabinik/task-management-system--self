import { Navigate } from 'react-router-dom'

function ProtectedRoute({
  children,
  adminOnly = false
}) {
  const isLoggedIn =
    localStorage.getItem('loggedIn')

  const role =
    localStorage.getItem('role')

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  if (
    adminOnly &&
    role !== 'Admin'
  ) {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default ProtectedRoute