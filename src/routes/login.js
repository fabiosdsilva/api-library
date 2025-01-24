const express = require('express');
const routes = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../config/mysql');

routes.post('/login', async (req, res) => {
    const { email, password } = req.body;


    try {
      const [results] = await db.promise().query("SELECT email, password FROM users WHERE email = ?", [email]);
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPassword = await bcrypt.compare(password, results[0].password);
      if (!isPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ email: results[0].email}, process.env.JWT_SECRET );
      return res.status(200).json({ token });

    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message })
        
    }
})

module.exports = routes;