// import express from "express";
// import employesRouter from "./routers/employees.routes.js";
// import indexRoutes from "./routers/index.routes.js"

// import './config.js'

// const app = express()

// app.use(indexRoutes)
// app.use(employesRouter)

// app.listen(3000)
// console.log('Server listening on port 3000')


import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT);
console.log(`Server on port http://localhost:${PORT}`);


// import { pool } from "../db.js";

// export const index = (req, res) => res.json({ message: "welcome to my api" });

// export const ping = async (req, res) => {
//   const [result] = await pool.query('SELECT "pong" as result');
//   res.json(result[0]);
// };