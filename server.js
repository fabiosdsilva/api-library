// Express
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const db = require('./src/config/mysql.js');

require('dotenv').config();
// Routes
const books = require('./src/routes/books');
const login = require('./src/routes/login');

db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.stack);
      return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL!');
  });
  
// Middleware

app.use(express.json());
app.use('/', books);
app.use('/', login);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});