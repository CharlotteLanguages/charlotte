import {pool} from "../db.js";

export const index = (req, res) => res.json({message: 'welcome to my api'});

export const ping = async (req, res) => {
    const [resul] = await pool.query('SELECT "pong" as result')
    res.json(resul[0])
}