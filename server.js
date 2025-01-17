// Express
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const db = require('./src/config/mysql.js');

// Routes
const apiRouter = require('./src/routes/books');

db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.stack);
      return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL!');
  });
  
// Middleware

app.use(express.json());
app.use('/', apiRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});