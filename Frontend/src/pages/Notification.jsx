import Sidebar from '../components/Sidebar'
import '../Notification.css'

function Notification() {
  return (
    <>
      <Sidebar />

      <div className="notification-container">
        <h1>Notification</h1>

        <table className="notification-table">
          <thead>
            <tr>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Task "Design UI" assigned</td>
              <td>2026-06-05</td>
            </tr>

            <tr>
              <td>New Project created</td>
              <td>2026-06-04</td>
            </tr>

            <tr>
              <td>Task "Testing" completed</td>
              <td>2026-06-03</td>
            </tr>

            <tr>
              <td>Project status updated</td>
              <td>2026-06-02</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Notification