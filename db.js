const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Database connection configuration
const dbConfig = {
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  port: 5432,
  database: 'venga',
};

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a route to fetch and display data
app.get('/', async (req, res) => {
  const client = new Client(dbConfig);

  try {
    await client.connect();

    const result = await client.query('SELECT * FROM customers');
    const customers = result.rows;

    res.render('index', { customers });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.end();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
