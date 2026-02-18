import express from "express";
import patientService from "../services/patientService";
import { NonSensitivePatientEntry } from "../types";
import { Response } from "express";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

export default router;
