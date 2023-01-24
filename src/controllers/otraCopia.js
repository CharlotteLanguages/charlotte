import { pool } from "../db.js";

export const getCertificados = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM CERTIFICADO");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getCertificado = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM CERTIFICADO WHERE idCertificado = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteCertificado = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM CERTIFICADO WHERE idCertificado = ?", [idCertificado]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createCertificado = async (req, res) => {
  try {
    const { nombre, tipo, horas } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO CERTIFICADO (nombre, tipo, horas) VALUES (?, ?, ?)",
      [nombre, tipo, horas]
    );
    res.status(201).json({ id: rows.insertId, nombre, tipo, horas });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateCertificado = async (req, res) => {
  try {
    const { idCertificado } = req.params;
    const { nombre, tipo, horas } = req.body;

    const [result] = await pool.query(
      "UPDATE CERTFICADO SET nombre = IFNULL(?, nombre), tipo = IFNULL(?, tipo), horas = IFNULL(?, horas) WHERE idCertificado = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Certificado not found" });

    const [rows] = await pool.query("SELECT * FROM CERTIFICADO WHERE idCertificado = ?", [
      idCertificado,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};