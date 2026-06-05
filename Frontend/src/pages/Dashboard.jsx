import '../Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="card-container">
        <div className="card">
          <h3>Total Projects</h3>
          <p>5</p>
        </div>

        <div className="card">
          <h3>Total Tasks</h3>
          <p>25</p>
        </div>

        <div className="card">
          <h3>Completed Tasks</h3>
          <p>18</p>
        </div>
      </div>

      <button className="create-btn">
        Create Task
      </button>
    </div>
  )
}

export default Dashboard