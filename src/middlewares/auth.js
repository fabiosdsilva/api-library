const jwt = require("jsonwebtoken");
const db = require("../config/mysql");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ auth: false, message: "No token provided." });
  }

  const [Bearer, token] = authorization.split(" ");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const [results] = await db.promise().query('SELECT * FROM users WHERE email = ?', [payload.email]);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error: error });

  }
};

