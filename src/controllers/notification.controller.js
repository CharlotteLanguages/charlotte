import { pool } from "../db.js";

export const getNotifications = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM NOTIFICATION");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getNotification = async (req, res) => {
  try {
    const { idNotificaciones } = req.params;
    const [rows] = await pool.query("SELECT * FROM NOTIFICATION WHERE idNotificaciones = ?", [
      idNotificaciones,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { idNotificaciones } = req.params;
    const [rows] = await pool.query("DELETE FROM NOTIFICATION WHERE idNotificaciones = ?", [idNotificaciones]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createNotification = async (req, res) => {
  try {
    const { nombre, tipo, descripcion, receptor, emisor } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO NOTIFICATION (nombre, tipo, descripcion, receptor, emisor) VALUES (?, ?)",
      [nombre, tipo, descripcion, receptor, emisor]
    );
    res.status(201).json({ idNotificaciones: rows.insertId, nombre, tipo, descripcion, receptor, emisor });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateNotification = async (req, res) => {
  try {
    const { idNotificaciones } = req.params;
    const { nombre, tipo, descripcion, receptor, emisor } = req.body;

    const [result] = await pool.query(
      "UPDATE NOTIFICATION SET nombre = IFNULL(?, nombre), tipo = IFNULL(?, tipo), descripcion = IFNULL(?, descripcion), receptor = IFNULL(?, receptor), emisor = IFNULL(?, emisor) WHERE idNotificaciones = ?",
      [nombre, tipo, descripcion, receptor, emisor, idNotificaciones]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Notification not found" });

    const [rows] = await pool.query("SELECT * FROM NOTIFICATION WHERE idNotificaciones = ?", [
      idNotificaciones,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};