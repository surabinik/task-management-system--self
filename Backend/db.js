const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '1990',
  database: 'task_manager'
})

connection.connect((err) => {
  if (err) {
    console.log('Connection Failed')
    console.log(err)
    return
  }

  console.log('MySQL Connected Successfully')
})

module.exports = connection