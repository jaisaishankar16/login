const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Use built-in JSON middleware

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '16sepK@sai',
    database: 'db',
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from('16sepK@sai'), // Provide the password
    },
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(result);
      }
    });
  });


  app.post('/api/updateUser', (req, res) => {
    const { id, username, email } = req.body;
  
    // Update user data in MySQL
    const sql = 'UPDATE users SET username=?, email=? WHERE id=?';
    db.query(sql, [username, email, id], (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'User updated successfully' });
      }
    });
  });
// Hash Password Function
const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

// Compare Password Function
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};


app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    // Use CONCAT function in the SQL query for concatenation
    const sql = 'INSERT INTO users (username, email, password) VALUES (CONCAT(?, ?), ?, ?)';
    
    // Provide the actual values as an array in the db.query function
    db.query(sql, [firstName, lastName, email, password], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'User registered successfully' });
      }
    });
  });
  

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                // Compare hashed password
                const storedPassword = results[0].password;
                const passwordMatch = await comparePassword(password, storedPassword);
                if (password === storedPassword) {
                    res.status(200).json({ message: 'Login successful' });
                } else {
                    res.status(401).json({ error: 'Invalid credentials' });
                    console.log(results);
                }
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
                console.log(results);
            }
        }
    });
});

// Your other API endpoints go here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
