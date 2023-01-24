import { pool } from "../db.js";

export const getPatrocinadors = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM PATROCINADOR");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getPatrocinador = async (req, res) => {
  try {
    const { idPatrocinador } = req.params;
    const [rows] = await pool.query("SELECT * FROM PATROCINADOR WHERE idPatrocinador = ?", [
      idPatrocinador,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deletePatrocinador = async (req, res) => {
  try {
    const { idPatrocinador } = req.params;
    const [rows] = await pool.query("DELETE FROM PATROCINADOR WHERE idPatrocinador = ?", [idPatrocinador]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createPatrocinador = async (req, res) => {
  try {
    const { nombre, direccion, webSite } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO PATROCINADOR (nombre, direccion, webSite) VALUES (?, ?, ?)",
      [nombre, direccion, webSite]
    );
    res.status(201).json({ idPatrocinador: rows.insertId, nombre, direccion, webSite });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updatePatrocinador = async (req, res) => {
  try {
    const { idPatrocinador } = req.params;
    const { nombre, direccion, webSite } = req.body;

    const [result] = await pool.query(
      "UPDATE PATROCINADOR SET nombre = IFNULL(?, nombre), direccion = IFNULL(?, direccion), webSite = IFNULL(?, webSite) WHERE idPatrocinador = ?",
      [nombre, direccion, webSite, idPatrocinador]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Sponsor not found" });

    const [rows] = await pool.query("SELECT * FROM PATROCINADOR WHERE idPatrocinador = ?", [
      idPatrocinador,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};