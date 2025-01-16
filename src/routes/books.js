// Routes for books
const express = require('express');
const routes = express.Router();
const db = require('../config/mysql.js');

routes.get('/books', (req, res) => { 
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
          console.error('Erro ao buscar dados:', err);
        } else {
          console.log('Dados da tabela books:', results);
        }
        return res.json(results);

        db.end(); 
      });
});

routes.post('/books', (req, res) => { 
    const { title, author, genre, year } = req.body;
    console.log('Dados recebidos:', req.body);
    db.query('INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)', [title, author, genre, year], (err, results) => {
        if (err) {
          console.error('Erro ao inserir dados:', err);
        } else {
          console.log('Dados inseridos com sucesso!');
        }
        return res.json(results);

        db.end(); 
      });
});

module.exports = routes;