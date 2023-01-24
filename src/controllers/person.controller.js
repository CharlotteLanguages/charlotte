import { pool } from "../db.js";

export const getPersons = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM PERSON");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getPerson = async (req, res) => {
  try {
    const { idPerson } = req.params;
    const [rows] = await pool.query("SELECT * FROM PERSON WHERE idPerson = ?", [
      idPerson,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deletePerson = async (req, res) => {
  try {
    const { idPerson } = req.params;
    const [rows] = await pool.query("DELETE FROM PERSON WHERE idPerson = ?", [idPerson]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createPerson = async (req, res) => {
  try {
    const { typeDocument, numberDocument, name, lastname, age, nationality, gender, email, PERSON_NOTIFICACIONES_idNotificaciones } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO PERSON (typeDocument, numberDocument, name, lastname, age, nationality, gender, email, PERSON_NOTIFICACIONES_idNotificaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)",
      [typeDocument, numberDocument, name, lastname, age, nationality, gender, email, PERSON_NOTIFICACIONES_idNotificaciones]
    );
    res.status(201).json({ idPerson: rows.insertId, typeDocument, numberDocument, name, lastname, age, nationality, gender, email, PERSON_NOTIFICACIONES_idNotificaciones });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updatePerson = async (req, res) => {
  try {
    const { idPerson } = req.params;
    const { typeDocument, numberDocument, name, lastname, age, nationality, gender, email, PERSON_NOTIFICACIONES_idNotificaciones } = req.body;

    const [result] = await pool.query(
      "UPDATE PERSON SET typeDocument = IFNULL(?, typeDocument), numberDocument = IFNULL(?, numberDocument), name = IFNULL(?, name), lastname = IFNULL(?, lastname), age = IFNULL(?, age), nationality = IFNULL(?, nationality), gender = IFNULL(?, gender), email = IFNULL(?, email), PERSON_NOTIFICACIONES_idNotificaciones = IFNULL(?, PERSON_NOTIFICACIONES_idNotificaciones) WHERE idPerson = ?",
      [typeDocument, numberDocument, name, lastname, age, nationality, gender, email, PERSON_NOTIFICACIONES_idNotificaciones, idPerson]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Person not found" });

    const [rows] = await pool.query("SELECT * FROM PERSON WHERE idPerson = ?", [
        idPerson,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};