const { Client } = require("pg");
require("dotenv").config();

let DB_URI;

if (process.env.NODE_ENV === "test") {
    DB_URI = "postgresql:///natenguyen";
 } else {
    DB_URI = process.env.DATABASE_URL || "postgresql:///natenguyen";
 }

let db = new Client({
    connectionString: DB_URI
});

db.connect();
module.exports = db;