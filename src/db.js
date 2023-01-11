import { createPool } from 'mysql2/promise'

import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
  } from "./config.js";

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
})

// export const PORT = process.env.PORT || 6641
// export const DB_HOST = 'containers-us-west-175.railway.app'
// export const DB_USER = 'root'
// export const DB_PASSWORD = 'OVA0FamMNKlFdLLemE6J'
// export const DB_NAME = 'railway'
// export const DB_PORT = 3000