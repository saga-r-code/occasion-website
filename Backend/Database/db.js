import mariadb from 'mariadb';

//Connect to database
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sagar',
  database: 'occasion_database'
});

//for connection
let conn

try {
  conn = await pool.getConnection();
  console.log('Database connection established');

} catch (error) {
  console.log(error)
}

export default pool;