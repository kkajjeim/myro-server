const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  "type": "mysql",
  "host": process.env.RDS_URL,
  "port": process.env.PORT,
  "username": process.env.USERNAME,
  "password": process.env.PASSWORD,
  "database": process.env.DB_NAME,
  "synchronize": true,
  "entities": ["src/entity/*.ts"],
  "timezone": 'Z'
};
