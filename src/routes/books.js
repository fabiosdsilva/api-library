// Routes for books
const express = require('express');
const routes = express.Router();
const db = require('../config/mysql.js');
const authorization = require('../middlewares/auth');

const BooksController = require('../controllers/Books');

routes.get('/books', authorization, BooksController.getAll);

routes.post('/books', authorization, BooksController.create);

routes.put('/books/:id',  BooksController.updatedBook);

routes.delete('/books/:id', authorization , BooksController.deleteBook);

module.exports = routes;