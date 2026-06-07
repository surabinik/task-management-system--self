import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import '../Dashboard.css'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

function Dashboard() {
  const [projectCount, setProjectCount] = useState(0)
  const [taskCount, setTaskCount] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [pendingTasks, setPendingTasks] = useState(0)
  const [userCount, setUserCount] = useState(0)

  const [recentNotifications, setRecentNotifications] =
    useState([])

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const [
        projectRes,
        taskRes,
        completedRes,
        pendingRes,
        usersRes,
        notificationRes
      ] = await Promise.all([
        fetch(
          'http://localhost:5000/dashboard/projects'
        ),
        fetch(
          'http://localhost:5000/dashboard/tasks'
        ),
        fetch(
          'http://localhost:5000/dashboard/completedTasks'
        ),
        fetch(
          'http://localhost:5000/dashboard/pendingTasks'
        ),
        fetch('http://localhost:5000/users'),
        fetch(
          'http://localhost:5000/notifications'
        )
      ])

      const projectData =
        await projectRes.json()

      const taskData =
        await taskRes.json()

      const completedData =
        await completedRes.json()

      const pendingData =
        await pendingRes.json()

      const usersData =
        await usersRes.json()

      const notificationData =
        await notificationRes.json()

      setProjectCount(projectData.total || 0)
      setTaskCount(taskData.total || 0)
      setCompletedTasks(completedData.total || 0)
      setPendingTasks(pendingData.total || 0)

      setUserCount(
        Array.isArray(usersData)
          ? usersData.length
          : 0
      )

      setRecentNotifications(
        Array.isArray(notificationData)
          ? notificationData.slice(0, 5)
          : []
      )
    } catch (error) {
      console.error(
        'Dashboard Load Error:',
        error
      )
    }
  }

  const completionRate =
    taskCount > 0
      ? Math.round(
          (completedTasks / taskCount) * 100
        )
      : 0

  const chartData = [
    {
      name: 'Completed',
      value: completedTasks
    },
    {
      name: 'Pending',
      value: pendingTasks
    }
  ]

  const COLORS = ['#22c55e', '#ef4444']

  const today = new Date().toLocaleDateString()

  return (
    <>
      <Sidebar />

      <div className="dashboard">
        <h1>Dashboard</h1>

        <h3 className="welcome-text">
          Welcome Admin 👋
        </h3>

        <p className="dashboard-date">
          Today: {today}
        </p>

        {/* Statistics Cards */}

        <div className="card-container">
          <div className="card">
            <h3>Total Projects</h3>
            <p>{projectCount}</p>
          </div>

          <div className="card">
            <h3>Total Tasks</h3>
            <p>{taskCount}</p>
          </div>

          <div className="card">
            <h3>Completed Tasks</h3>
            <p>{completedTasks}</p>
          </div>

          <div className="card">
            <h3>Pending Tasks</h3>
            <p>{pendingTasks}</p>
          </div>

          <div className="card">
            <h3>Total Users</h3>
            <p>{userCount}</p>
          </div>
        </div>

        {/* Progress */}

        <div className="progress-section">
          <h2>Task Completion Rate</h2>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${completionRate}%`
              }}
            ></div>
          </div>

          <p className="progress-text">
            {completionRate}% Completed
          </p>
        </div>

        {/* Chart + Recent Activities */}

        <div className="chart-recent-container">
          <div className="chart-section">
            <h2>Task Analytics</h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {chartData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="recent-section">
            <h2>Recent Activities</h2>

            <ul className="activity-list">
              {recentNotifications.length >
              0 ? (
                recentNotifications.map(
                  (notification) => (
                    <li
                      key={notification.id}
                    >
                      {
                        notification.message
                      }
                    </li>
                  )
                )
              ) : (
                <li>
                  No recent activities
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard