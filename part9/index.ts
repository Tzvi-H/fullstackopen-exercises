import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (
    !height ||
    !weight ||
    Number.isNaN(heightNumber) ||
    Number.isNaN(weightNumber)
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const bmi = calculateBmi(heightNumber, weightNumber);
  return res.json({
    bmi,
    height: heightNumber,
    weight: weightNumber,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
