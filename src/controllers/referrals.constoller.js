import { pool, Pool } from "../db.js";

export const getReferrals = async (req, res, next) => {
    try {
        const [rows] = await pool.query("SELECT * FROM REFERIDOS");
        res.json(rows);
    } catch (err) {
        return res.status(500).json({message: "Something goes wrong"});
    }
};

export const getReferral = async (req, res) => {
    try {
        const { idReferidos } = req.params;
        const [rows] = await pool.query("SELECT * FROM REFERIDOS WHERE idReferidos = ?", [ idReferidos,]);

        if (rows.lenght <= 0) {
            return res.status(404).json({message: "Referral not found"});
        }

        res.json(rows[0]);
    } catch (err) {
        return res.status(500).json({message: "Something goes wrong"});
    }
};

export const deleteReferral = async (req, res) => {
  try {
    const { idPerson } = req.params;
    const [rows] = await pool.query("DELETE FROM REFERIDOS WHERE idReferidos = ?", [idReferidos]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Referral not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createReferral = async (req, res) => {
  try {
    const { referencias, email, telefono } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO REFERIDOS (referencias, email, telefono) VALUES (?, ?, ?)",
      [referencias, email, telefono]
    );
    res.status(201).json({ idReferidos: rows.insertId, referencias, email, telefono });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateReferral = async (req, res) => {
  try {
    const { idReferidos } = req.params;
    const { referencias, email, telefono } = req.body;

    const [result] = await pool.query(
      "UPDATE REFERIDOS SET referencias = IFNULL(?, referencias), email = IFNULL(?, email), telefono = IFNULL(?, telefono) WHERE idReferidos = ?",
      [referencias, email, telefono, idReferidos]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Referral not found" });

    const [rows] = await pool.query("SELECT * FROM PERSON WHERE idReferidos = ?", [
        idPerson,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};