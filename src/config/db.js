require('dotenv').config();

const {
  MYSQL_DIALECT,
  MYSQL_USER,
  MYSQL_HOST_NAME,
  MYSQL_DATABASE,
  MYSQL_PORT,
  MYSQL_PASSWORD
} = process.env;

if (!MYSQL_USER || !MYSQL_DATABASE) {
  throw new Error('As variáveis de ambiente MYSQL_USER e MYSQL_DATABASE são obrigatórias!');
}

module.exports = {
  dialect: MYSQL_DIALECT,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  host: MYSQL_HOST_NAME,
  database: MYSQL_DATABASE,
  port: parseInt(MYSQL_PORT, 10),
  define: {
    timestamps: true,
    underscored: true,
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',
};
