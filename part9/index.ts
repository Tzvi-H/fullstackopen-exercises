import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let { daily_exercises: dailyExercises, target } = req.body;

  if (dailyExercises === undefined || target === undefined) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  if (!Array.isArray(dailyExercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  target = Number(target);
  dailyExercises = dailyExercises.map(Number);

  if (
    Number.isNaN(target) ||
    dailyExercises.some((h: any) => Number.isNaN(h))
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const excerciseSummary = calculateExercises(dailyExercises, target);

  return res.json(excerciseSummary);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
