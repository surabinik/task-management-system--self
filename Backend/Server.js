const express = require('express')
const cors = require('cors')
const db = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend Running')
})

/* ===========================
   PROJECTS
=========================== */

app.get('/projects', (req, res) => {
  db.query(
    'SELECT * FROM projects',
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

app.post('/projects', (req, res) => {
  const {
    name,
    status,
    start_date
  } = req.body

  db.query(
    'INSERT INTO projects (name, status, start_date) VALUES (?, ?, ?)',
    [name, status, start_date],
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

app.put('/projects/:id', (req, res) => {
  const id = req.params.id

  const {
    name,
    status,
    start_date
  } = req.body

  console.log('UPDATE PROJECT')
  console.log(req.body)

  db.query(
    'UPDATE projects SET name=?, status=?, start_date=? WHERE id=?',
    [name, status, start_date, id],
    (err, result) => {
      if (err) {
        console.log('MYSQL ERROR:')
        console.log(err)

        return res.status(500).json(err)
      }

      console.log('SUCCESS:')
      console.log(result)

      res.json(result)
    }
  )
})

app.delete('/projects/:id', (req, res) => {
  const id = req.params.id

  db.query(
    'DELETE FROM projects WHERE id=?',
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

/* ===========================
   TASKS
=========================== */


app.get('/tasks', (req, res) => {
  db.query(
    `
    SELECT
      tasks.*,
      projects.name AS project_name,
      users.username AS assigned_username
    FROM tasks
    LEFT JOIN projects
      ON tasks.project_id = projects.id
    LEFT JOIN users
      ON tasks.assigned_user = users.id
    `,
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

app.post('/tasks', (req, res) => {
  console.log('BODY:', req.body)
  const {
    task_name,
    priority,
    status,
    project_id,
    assigned_user,
    due_date
  } = req.body

   console.log(
    task_name,
    priority,
    status,
    project_id,
    assigned_user,
    due_date
  )

  db.query(
    `
    INSERT INTO tasks
    (
      task_name,
      priority,
      status,
      project_id,
      assigned_user,
      due_date
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      task_name,
      priority,
      status,
      project_id,
      assigned_user,
      due_date
    ],
    (err, result) => {
      if (err) {
  console.log('MYSQL ERROR:', err)
  return res.status(500).json(err)
}

      const notificationMessage =
        `Task "${task_name}" assigned`

      db.query(
        `
        INSERT INTO notifications
        (message, created_at)
        VALUES (?, CURDATE())
        `,
        [notificationMessage]
      )

      res.json(result)
    }
  )
})

app.put('/tasks/:id', (req, res) => {
  const id = req.params.id

  const {
    task_name,
    priority,
    status,
    project_id,
    assigned_user,
    due_date
  } = req.body

  db.query(
    `
    UPDATE tasks
    SET
      task_name=?,
      priority=?,
      status=?,
      project_id=?,
      assigned_user=?,
      due_date=?
    WHERE id=?
    `,
    [
      task_name,
      priority,
      status,
      project_id,
      assigned_user,
      due_date,
      id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id

  db.query(
    'DELETE FROM tasks WHERE id=?',
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})
/* ===========================
   NOTIFICATIONS
=========================== */

app.get('/notifications', (req, res) => {
  db.query(
    'SELECT * FROM notifications ORDER BY id DESC',
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

app.post('/notifications', (req, res) => {
  const {
    message,
    created_at
  } = req.body

  db.query(
    'INSERT INTO notifications (message, created_at) VALUES (?, ?)',
    [message, created_at],
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

app.put('/notifications/:id', (req, res) => {
  const id = req.params.id

  const {
    message,
    created_at
  } = req.body

  db.query(
    'UPDATE notifications SET message=?, created_at=? WHERE id=?',
    [message, created_at, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

app.delete('/notifications/:id', (req, res) => {
  const id = req.params.id

  db.query(
    'DELETE FROM notifications WHERE id=?',
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

/* ===========================
   DASHBOARD
=========================== */

app.get('/dashboard/projects', (req, res) => {
  db.query(
    'SELECT COUNT(*) AS total FROM projects',
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result[0])
    }
  )
})

app.get('/dashboard/tasks', (req, res) => {
  db.query(
    'SELECT COUNT(*) AS total FROM tasks',
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result[0])
    }
  )
})

app.get('/dashboard/completedTasks', (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total FROM tasks WHERE status='Completed'",
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result[0])
    }
  )
})

app.get('/dashboard/pendingTasks', (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total FROM tasks WHERE status!='Completed'",
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result[0])
    }
  )
})

app.get('/dashboard/notifications', (req, res) => {
  db.query(
    'SELECT COUNT(*) AS total FROM notifications',
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result[0])
    }
  )
})

/* ===========================
   LOGIN
=========================== */
/* ===========================
   LOGIN
=========================== */

app.post('/login', (req, res) => {
  const { username, password } = req.body

  console.log('LOGIN ATTEMPT:')
  console.log('Username:', username)
  console.log('Password:', password)

  db.query(
    'SELECT * FROM users WHERE username=? AND password=?',
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).json(err)
      }

      console.log('RESULT:')
      console.log(result)

      if (result.length > 0) {
        res.json({
          success: true,
          role: result[0].role
        })
      } else {
        res.json({
          success: false
        })
      }
    }
  )
})

/* ===========================
   USERS
=========================== */

app.get('/users', (req, res) => {
  db.query(
    'SELECT * FROM users',
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

app.post('/users', (req, res) => {
  const {
    username,
    password,
    role
  } = req.body

  db.query(
    'INSERT INTO users (username,password,role) VALUES (?,?,?)',
    [username, password, role],
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

app.put('/users/:id', (req, res) => {
  const id = req.params.id

  const {
    username,
    password,
    role
  } = req.body

  db.query(
    'UPDATE users SET username=?, password=?, role=? WHERE id=?',
    [username, password, role, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

app.delete('/users/:id', (req, res) => {
  const id = req.params.id

  db.query(
    'DELETE FROM users WHERE id=?',
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err)
      }

      res.json(result)
    }
  )
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})