const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',    
  user: 'my_library',         
  password: 'senha_segura',         
  database: 'Library',  
});


module.exports = db;
