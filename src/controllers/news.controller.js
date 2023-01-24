import { pool } from "../db.js";

export const getNews = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM NEWS");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getNew = async (req, res) => {
  try {
    const { idNews } = req.params;
    const [rows] = await pool.query("SELECT * FROM NEWS WHERE idNews = ?", [
      idNews,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteNew = async (req, res) => {
  try {
    const { idNews } = req.params;
    const [rows] = await pool.query("DELETE FROM NEWS WHERE idNews = ?", [idNews]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "News not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createNew = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO NEWS (title, description, category, tags) VALUES (?, ?, ?, ?)",
      [title, description, category, tags]
    );
    res.status(201).json({ idNews: rows.insertId, title, description, category, tags });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateNew = async (req, res) => {
  try {
    const { idNews } = req.params;
    const { title, description, category, tags } = req.body;

    const [result] = await pool.query(
      "UPDATE NEWS SET title = IFNULL(?, title), description = IFNULL(?, description), category = IFNULL(?, category), tags = IFNULL(?, tags) WHERE idNews = ?",
      [title, description, category, tags, idNews]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "News not found" });

    const [rows] = await pool.query("SELECT * FROM NEWS WHERE idNews = ?", [
      idNews,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};