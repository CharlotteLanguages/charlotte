import { pool } from "../db.js";

export const getSocialNetworkss = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM social_networks");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getSocialNetworks = async (req, res) => {
  try {
    const { idSocialNetworks } = req.params;
    const [rows] = await pool.query("SELECT * FROM social_networks WHERE idSocialNetworks = ?", [
      idSocialNetworks,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Social networks not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteSocialNetworks = async (req, res) => {
  try {
    const { idSocialNetworks } = req.params;
    const [rows] = await pool.query("DELETE FROM social_networks WHERE idSocialNetworks = ?", [idSocialNetworks]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createSocialNetworks = async (req, res) => {
  try {
    const { networks } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO social_networks (networks) VALUES (?)",
      [networks]
    );
    res.status(201).json({ idSocialNetworks: rows.insertId, networks });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateSocialNetworks = async (req, res) => {
  try {
    const { idSocialNetworks } = req.params;
    const { networks } = req.body;

    const [result] = await pool.query(
      "UPDATE social_networks SET networks = IFNULL(?, networks) WHERE idSocialNetworks = ?",
      [networks, idSocialNetworks]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Social networks not found" });

    const [rows] = await pool.query("SELECT * FROM social_networks WHERE idSocialNetworks = ?", [
      idSocialNetworks,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};