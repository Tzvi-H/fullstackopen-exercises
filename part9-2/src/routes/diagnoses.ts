import express from "express";
import diagnosisService from "../services/diagnosisService";
import { Response } from "express";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getEntries());
});

export default router;
