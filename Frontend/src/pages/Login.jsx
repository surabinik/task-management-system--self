import '../Login.css'

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Task Management System</h1>

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
        />

        <input
          type="password"
          placeholder="Enter Password"
        />

        <button>Login</button>
      </div>
    </div>
  )
}

export default Login