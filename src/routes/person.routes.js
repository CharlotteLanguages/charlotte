import { Router } from "express";
import {
  createPerson,
  deletePerson,
  getPersons,
  getPerson,
  updatePerson,
} from "../controllers/person.controller.js";

const router = Router();

// GET all Persons
router.get("/persons", getPersons);

// GET An Person
router.get("/persons/:idPerson", getPerson);

// DELETE An Person
router.delete("/persons/:idPerson", deletePerson);

// INSERT An Person
router.post("/persons", createPerson);

router.patch("/persons/:idPerson", updatePerson);

export default router;
