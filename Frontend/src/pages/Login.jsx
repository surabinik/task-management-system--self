import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      )

      const data = await response.json()

   if (data.success) {
  localStorage.setItem(
    'loggedIn',
    'true'
  )

  localStorage.setItem(
    'role',
    data.role
  )

  localStorage.setItem(
    'username',
    username
  )

  navigate('/dashboard')
}
else {
        alert(
          'Invalid Username or Password'
        )
      }
    } catch (error) {
      console.log(error)
      alert('Server Error')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Task Management System</h1>

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login