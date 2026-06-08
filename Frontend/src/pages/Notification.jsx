import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import '../Notification.css'

function Notification() {
  const [notifications, setNotifications] = useState([])
  const [message, setMessage] = useState('')
  const [date, setDate] = useState('')
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')

  const role =
  localStorage.getItem('role');
  console.log(
  'ROLE:',
  localStorage.getItem('role')
);

const canManage =
  role === 'Admin' ||
  role === 'Project Manager'

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/notifications'
      )

      const data = await response.json()

      setNotifications(data)
    } catch (error) {
      console.log(error)
    }
  }

  const addNotification = async () => {
    if (!message || !date) return

    try {
      if (editId) {
        await fetch(
          `http://localhost:5000/notifications/${editId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message,
              created_at: date
            })
          }
        )

        setEditId(null)
      } else {
        await fetch(
          'http://localhost:5000/notifications',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message,
              created_at: date
            })
          }
        )
      }

      await loadNotifications()

      setMessage('')
      setDate('')
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNotification = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this notification?'
      )
    ) {
      return
    }

    try {
      await fetch(
        `http://localhost:5000/notifications/${id}`,
        {
          method: 'DELETE'
        }
      )

      await loadNotifications()
    } catch (error) {
      console.log(error)
    }
  }

  const editNotification = (notification) => {
    setMessage(notification.message)

    setDate(
      notification.created_at
        ? notification.created_at.split('T')[0]
        : ''
    )

    setEditId(notification.id)
  }

  const filteredNotifications =
    notifications.filter((notification) =>
      notification.message
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  return (
    <>
      <Sidebar />

      <div className="notification-container">
        <h1>Notifications</h1>

        {canManage && (
          <div className="notification-form">
            <input
              type="text"
              placeholder="Notification Message"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

            <button onClick={addNotification}>
              {editId
                ? 'Update Notification'
                : 'Add Notification'}
            </button>
          </div>
        )}

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search Notifications..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="table-wrapper">
          <table className="notification-table">
            <thead>
              <tr>
                <th>Message</th>
                <th>Date</th>

                {canManage && (
                  <th>Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {filteredNotifications.map(
                (notification) => (
                  <tr key={notification.id}>
                    <td>
                      {notification.message}
                    </td>

                    <td>
                      {notification.created_at
                        ? notification.created_at.split(
                            'T'
                          )[0]
                        : ''}
                    </td>

                    {canManage && (
                      <td>
                        <button
                          onClick={() =>
                            editNotification(
                              notification
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteNotification(
                              notification.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Notification