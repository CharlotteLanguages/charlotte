import { pool } from "../db.js";

export const getMerberships = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM MERBERSHIP");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getMerbership = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM MERBERSHIP WHERE idMerbership = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Merbership not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteMerbership = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM MERBERSHIP WHERE idMerbership = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Merbership not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createMerbership = async (req, res) => {
  try {
    const { afiLiacion, categoria, precio } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO MEMBERSHIP (afiLiacion, categoria, precio) VALUES (?, ?, ?)",
      [afiLiacion,categoria, precio]
    );
    res.status(201).json({ idMerbership: rows.insertId, afiLiacion, categoria, precio });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateMerbership = async (req, res) => {
  try {
    const { idMembership } = req.params;
    const { afiLiacion, categoria, precio } = req.body;

    const [result] = await pool.query(
      "UPDATE MEMBERSHIP SET afiLiacion = IFNULL(?, afiLiacion), categoria = IFNULL(?, categoria), precio = IFNULL(?, precio) WHERE idMembership = ?",
      [afiLiacion, categoria, precio, idMembership]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Merbership not found" });

    const [rows] = await pool.query("SELECT * FROM MEMBERSHIP WHERE idMembership = ?", [
      idMerbership,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};