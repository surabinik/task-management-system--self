import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import '../Users.css'

function Users() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('User')

  const [editId, setEditId] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/users'
      )

      const data = await response.json()

      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  const saveUser = async () => {
    if (!username || !password) return

    try {
      if (editId) {
        await fetch(
          `http://localhost:5000/users/${editId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username,
              password,
              role
            })
          }
        )

        setEditId(null)
      } else {
        await fetch(
          'http://localhost:5000/users',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username,
              password,
              role
            })
          }
        )
      }

      setUsername('')
      setPassword('')
      setRole('User')

      loadUsers()
    } catch (error) {
      console.log(error)
    }
  }

  const editUser = (user) => {
    setUsername(user.username)
    setPassword(user.password)
    setRole(user.role)

    setEditId(user.id)
  }

  const deleteUser = async (id) => {
    if (
      !window.confirm(
        'Delete this user?'
      )
    )
      return

    await fetch(
      `http://localhost:5000/users/${id}`,
      {
        method: 'DELETE'
      }
    )

    loadUsers()
  }

  const filteredUsers =
    users.filter((user) =>
      user.username
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  return (
    <>
      <Sidebar />

      <div className="users-container">
        <h1>Users</h1>

        <input
          className="search-box"
          type="text"
          placeholder="🔍 Search Users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="user-form">
          <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
/>

          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option>Admin</option>
<option>Project Manager</option>
<option>Collaborator</option>
          </select>

          <button onClick={saveUser}>
            {editId
              ? 'Update User'
              : 'Add User'}
          </button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>

                <td>{user.role}</td>

                <td>
                  <button
                    onClick={() =>
                      editUser(user)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteUser(user.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Users