require('dotenv').config();
PORT=5000
DB_USER="postgres"
DB_PASSWORD="Prajwal@0403"
DB_NAME="postgres"
DB_HOST="db.waauwzazgebvrxwefidt.supabase.co"
JWT_SECRET="asdasdasdasd"
module.exports = {
  development: {
    username: "postgres",
    password: "Prajwal@0403",
    database: "postgres",
    host: "db.waauwzazgebvrxwefidt.supabase.co",
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  },
  production: {
    username: "postgres",
    password: "Prajwal@0403",
    database: "postgres",
    host: "db.waauwzazgebvrxwefidt.supabase.co",
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  }
}
